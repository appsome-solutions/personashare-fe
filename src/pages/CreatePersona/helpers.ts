import { ImageRef } from 'components/CropperWidget/CropperWidget';

type Cb = (imageRef: ImageRef) => void;

export const onAvatarChangeHelper = (file: File, cb: Cb): void => {
  cb({
    blobUrl: URL.createObjectURL(file),
    fieldName: 'avatarUpload',
    blob: file,
    minCropBoxHeight: 42,
    aspectRatio: 1,
  });
};

export const onBgChangeHelper = (file: File, cb: Cb): void => {
  cb({
    blobUrl: URL.createObjectURL(file),
    fieldName: 'backgroundUpload',
    blob: file,
    minCropBoxHeight: 154,
    aspectRatio: (window.innerWidth - 32) / 154,
  });
};

export const revokeObjectURLS = (objectUrls: (string | undefined)[]): void => {
  objectUrls.forEach(objectUrl => {
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
    }
  });
};

export const formUploadMapper: Record<string, string> = {
  avatarUpload: 'avatar',
  backgroundUpload: 'background',
};
