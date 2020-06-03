import React, { useCallback, RefObject } from 'react';
import styled from 'styled-components';
import Webcam from 'react-webcam';
import { QRCode } from 'jsqr';
import getPixels from 'get-pixels';
import VideoOverlay from './VideoOverlay';
import { useWorkerDecode } from './hooks/useWorkerDecode';
import { LoginOrHamburger } from './LoginOrHamburger';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  color: white;
  opacity: 0.5;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translate(-50%);
`;

type ExtendedWebcam = {
  ref: RefObject<Webcam>;
};

const StyledWebcam = styled(Webcam)<ExtendedWebcam | any>`
  width: 100%;
  height: calc(100vh - 108px);
  object-fit: fill;
`;

type defaultProps = {
  videoConstraints: MediaTrackConstraints;
  interval: number;
  buttonMode: boolean;
  className: string;
  onError: (error: string) => void;
};

type Props = {
  onCode: (code: QRCode) => void;
  onUserMediaError?: (error: string) => void;
} & defaultProps;

export type ImagePixels = {
  data: Uint8ClampedArray;
  offset: number;
  shape: number[];
  stride: number[];
};

let webWorker: Worker | null = null;

export const QrScanner = ({
  onCode,
  onError,
  onUserMediaError,
  className,
  videoConstraints,
  interval,
  buttonMode,
}: Props) => {
  const webcamRef = React.useRef<Webcam>(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef?.current?.getScreenshot();

    if (!imageSrc) {
      return;
    }
    getPixels(imageSrc, (err: string, image: ImagePixels) => {
      if (err) {
        onError(err);
        return;
      }
      webWorker?.postMessage(image);
    });
  }, [webcamRef, onError]);

  webWorker = useWorkerDecode({ capture, interval, onCode });

  return (
    <>
      <LoginOrHamburger />
      <Wrapper>
        <VideoOverlay />
        <StyledWebcam
          className={className}
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          forceScreenshotSourceSize
          videoConstraints={videoConstraints}
          onUserMediaError={onUserMediaError}
        />
        {buttonMode ? <Button onClick={capture} /> : null}
      </Wrapper>
    </>
  );
};

const defaultInterval = 500;

QrScanner.defaultProps = {
  videoConstraints: { facingMode: 'environment' },
  interval: defaultInterval,
  onError: (err: string) => {
    console.error(err);
  },
  buttonMode: false,
} as defaultProps;
