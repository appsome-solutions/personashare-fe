import { ImageRef } from 'components/CropperWidget/CropperWidget';

type Cb = (imageRef: ImageRef) => void;

export const onAvatarChangeHelper = (file: File, cb: Cb): void => {
  cb({
    blobUrl: URL.createObjectURL(file),
    fieldName: 'avatar',
    blob: file,
    minCropBoxHeight: 42,
    aspectRatio: 1,
  });
};

export const onBgChangeHelper = (file: File, cb: Cb): void => {
  cb({
    blobUrl: URL.createObjectURL(file),
    fieldName: 'background',
    blob: file,
    minCropBoxHeight: 154,
    aspectRatio: (window.innerWidth - 32) / 154,
  });
};
