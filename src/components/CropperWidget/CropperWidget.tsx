import React, { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Cropper from 'cropperjs';

import { Portal } from '../Portal/Portal';
import { WideButton } from '../Button';

export type ImageRef = {
  blobUrl: string;
  fieldName: string;
  blob?: Blob | null;
  aspectRatio?: number;
  minCropBoxHeight?: number;
};

type CropperWidgetProps = {
  imageRef: ImageRef;
  onCrop(data: ImageRef): void;
};

const ImagePreview = styled.img`
  display: block;
  max-width: 100%;
`;

const WidgetWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column-reverse;
  top: 0;
  background-color: ${props => props.theme.colors.utils.background.light};
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
  width: 100%;
  z-index: 90000000;
  transition: 400ms ease all;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.functional.disabled};
  opacity: 0.75;
  z-index: 1000;
`;

export const cropperDefaults: Cropper.Options = {
  aspectRatio: 16 / 9,
  minCropBoxHeight: 154,
  viewMode: 3,
  center: true,
  zoomable: false,
  cropBoxResizable: false,
  background: true,
  responsive: true,
};

export const CropperWidget: FC<CropperWidgetProps> = ({ imageRef, onCrop }) => {
  const ref = useRef<HTMLImageElement>(null);
  const [cropper, setCropper] = useState<Cropper>();

  useEffect(() => {
    if (ref.current) {
      setCropper(
        new Cropper(ref.current, {
          ...cropperDefaults,
          aspectRatio: imageRef.aspectRatio || cropperDefaults.aspectRatio,
          minCropBoxHeight: imageRef.minCropBoxHeight || cropperDefaults.minCropBoxHeight,
        })
      );
    }
  }, [imageRef]);

  const onCropBtnClick = (): void => {
    if (cropper) {
      cropper
        .crop()
        .getCroppedCanvas()
        .toBlob(blob => {
          onCrop({
            blobUrl: imageRef.blobUrl,
            fieldName: imageRef.fieldName,
            blob,
          });

          cropper.destroy();
          URL.revokeObjectURL(imageRef.blobUrl);
        });
    }
  };

  return (
    <Portal id="cropper-modal">
      <WidgetWrapper>
        {imageRef.blobUrl && <WideButton onClick={onCropBtnClick}>Crop</WideButton>}
        {imageRef.blobUrl && <ImagePreview src={imageRef.blobUrl} id="cropper-preview" ref={ref} />}
      </WidgetWrapper>
      {imageRef.blobUrl && <Overlay />}
    </Portal>
  );
};
