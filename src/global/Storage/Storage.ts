import { storage } from 'firebase/app';

type UploadResult = {
  status: storage.TaskState;
  progress: number;
  error?: string;
  downloadUrl?: string;
};

export type OnStateChange = (result: UploadResult) => void;

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
    metadata?: storage.UploadMetadata,
    onStateChange?: OnStateChange
  ): void => {
    if (!this.storageRef) {
      return;
    }

    const uploadTask = this.storageRef.child(destPath).put(data, metadata);

    let progress = 0;

    uploadTask.on(
      storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        if (progressStates.includes(snapshot.state)) {
          onStateChange &&
            onStateChange({
              status: snapshot.state,
              progress,
            });
        }
      },
      error => {
        onStateChange &&
          onStateChange({
            status: storage.TaskState.ERROR,
            progress,
            error: error.message,
          });
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadUrl => {
          onStateChange &&
            onStateChange({
              status: storage.TaskState.SUCCESS,
              progress,
              downloadUrl,
            });
        });
      }
    );
  };
}

export default Storage;
