import React, { useEffect, useCallback, RefObject } from 'react';
import styled from 'styled-components';
import Webcam from 'react-webcam';
import { QRCode } from 'jsqr';
import getPixels from 'get-pixels';
// eslint-disable-next-line
//@ts-ignore
import Worker from 'worker-loader!./decodeWorker.worker';
import VideoOverlay from './VideoOverlay';

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

const StyledWebcam = styled(Webcam)<ExtendedWebcam>`
  width: 100%;
  height: 100vh;
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

type ImagePxels = {
  data: Uint8ClampedArray;
  offset: number;
  shape: Array<number>;
  stride: Array<number>;
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
    getPixels(imageSrc, (err: string, image: ImagePxels) => {
      if (err) {
        onError(err);
        return;
      }
      webWorker?.postMessage(image);
    });
  }, [webcamRef]);

  const onMessage = (message: MessageEvent): void => {
    onCode(message.data);
  };

  useEffect(() => {
    webWorker = new Worker();
    webWorker.addEventListener('message', onMessage);
    const timer = setInterval(capture, interval);
    return () => {
      if (webWorker) {
        webWorker.terminate();
        webWorker = null;
      }
      clearInterval(timer);
    };
  }, [capture, interval]);

  return (
    <Wrapper>
      <VideoOverlay />
      <StyledWebcam
        className={className}
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        onUserMediaError={onUserMediaError}
      />
      {buttonMode ? <Button onClick={capture} /> : null}
    </Wrapper>
  );
};

QrScanner.defaultProps = {
  videoConstraints: { facingMode: 'environment' },
  interval: 500,
  onError: (err: string) => {
    console.error(err);
  },
  buttonMode: false,
} as defaultProps;

export default QrScanner;
