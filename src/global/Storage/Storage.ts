import { storage } from 'firebase/app';
import { FirebaseError } from 'firebase';
import { ListResult, OnStateChange, StorageError, StorageResult } from './namespace';

const progressStates: storage.TaskState[] = [
  storage.TaskState.PAUSED,
  storage.TaskState.CANCELED,
  storage.TaskState.RUNNING,
];

class Storage {
  storageRef?: storage.Reference;

  constructor(storageRef?: storage.Reference) {
    this.storageRef = storageRef;
  }

  upload = (
    destPath: string,
    data: Blob | Uint8Array | ArrayBuffer,
    onStateChange: OnStateChange,
    metadata?: storage.UploadMetadata
  ): void => {
    if (!this.storageRef) {
      onStateChange({
        progress: 0,
        status: '',
        error: 'No storage ref defined',
      });

      return;
    }

    const uploadTask = this.storageRef.child(destPath).put(data, metadata);

    let progress = 0;

    uploadTask.on(
      storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        if (progressStates.includes(snapshot.state)) {
          onStateChange({
            status: snapshot.state,
            progress,
          });
        }
      },
      (error: FirebaseError | Error) => {
        onStateChange({
          status: storage.TaskState.ERROR,
          progress,
          error: error.message,
          errorCode: (error as FirebaseError)?.code as StorageError,
        });
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl) => {
          onStateChange({
            status: storage.TaskState.SUCCESS,
            progress,
            downloadUrl,
            refPath: uploadTask.snapshot.ref.fullPath,
          });
        });
      }
    );
  };

  remove = async (ref: string | storage.Reference): Promise<StorageResult> => {
    if (!this.storageRef) {
      return {
        error: 'No storage ref defined',
        status: 'failed',
      };
    }

    try {
      if (typeof ref === 'string') {
        await this.storageRef.child(ref).delete();
      } else {
        await ref.delete();
      }

      return {
        status: 'success',
      };
    } catch (error) {
      return {
        error: error.message,
        errorCode: (error as FirebaseError)?.code as StorageError,
        status: 'failed',
      };
    }
  };

  list = async (path: string): Promise<ListResult> => {
    if (!this.storageRef) {
      return {
        error: 'No storage ref defined',
        status: 'failed',
      };
    }

    try {
      const lists = await this.storageRef.child(path).listAll();
      const storageItems = await Promise.all(
        lists.items.map(async (item) => {
          const downloadUrl = await item.getDownloadURL();

          return {
            downloadUrl,
            refPath: item.fullPath,
          };
        })
      );

      return {
        status: 'success',
        items: storageItems,
      };
    } catch (error) {
      return {
        error: error.message,
        errorCode: (error as FirebaseError)?.code as StorageError,
        status: 'failed',
      };
    }
  };
}

export default Storage;
