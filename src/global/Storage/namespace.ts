import { storage } from 'firebase/app';

// based on: https://firebase.google.com/docs/storage/web/handle-errors

export enum StorageError {
  UNKNOWN = 'storage/unknown',
  OBJECT_NOT_FOUND = 'storage/object-not-found',
  BUCKET_NOT_FOUND = 'storage/bucket-not-found',
  PROJECT_NOT_FOUND = 'storage/project-not-found',
  QUOTA_EXCEEDED = 'storage/quota-exceeded',
  UNAUTHENTICATED = 'storage/unauthenticated',
  UNAUTHORIZED = 'storage/unauthorized',
  RETRY_LIMIT_EXCEEDED = 'storage/retry-limit-exceeded',
  INVALID_CHECKSUM = 'storage/invalid-checksum',
  CANCELED = 'storage/canceled',
  INVALID_EVENT_NAME = 'storage/invalid-event-name',
  INVALID_URL = 'storage/invalid-url',
  INVALID_ARGUMENT = 'storage/invalid-argument',
  NO_DEFAULT_BUCKET = 'storage/no-default-bucket',
  CANNOT_SLICE_BLOB = 'storage/cannot-slice-blob',
  SERVER_FILE_WRONG_SIZE = 'storage/server-file-wrong-size',
}

export interface StorageItem {
  downloadUrl?: string;
  refPath?: string;
}

export type StorageResultStatus = 'success' | 'failed';

export type TaskType = 'task';

export interface StorageResult<R = ''> {
  status: R extends TaskType ? storage.TaskState : StorageResultStatus;
  error?: string;
  errorCode?: StorageError;
}

export interface UploadResult extends StorageResult<'task'>, StorageItem {
  progress: number;
}

export interface ListResult extends StorageResult {
  items?: StorageItem[];
}

export type OnStateChange = (result: UploadResult) => void;
