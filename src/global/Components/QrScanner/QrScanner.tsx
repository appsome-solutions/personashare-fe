import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Webcam from 'react-webcam';
import { QRCode } from 'jsqr';

const Wrapper = styled.div`
  position: relative;
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

type defaultProps = {
  videoConstraints: MediaTrackConstraints;
  interval: number;
  buttonMode: boolean;
  style: React.CSSProperties;
  onError: (error: string) => void;
};

type Props = {
  onCode: (code: QRCode) => void;
  onUserMediaError?: (error: string) => void;
  style?: React.CSSProperties;
} & defaultProps;

let webWorker: Worker | null = null;

export const QrScanner = ({
  /*  onCode,
  onError, */
  onUserMediaError,
  style,
  videoConstraints,
  interval,
  buttonMode,
}: Props) => {
  const webcamRef = React.useRef<Webcam>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef && webcamRef.current && webcamRef.current.getScreenshot();
    if (!imageSrc) {
      return;
    }
    webWorker && webWorker.postMessage(imageSrc);
    /*  getPixels(imageSrc, (err: string, image: ImagePxels) => {
      if (err) {
        onError(err);
        return;
      }
      const res = jsQr(image.data, image.shape[0], image.shape[1]);
      if (res) {
        onCode(res);
      }
    }); */
  }, [webcamRef]);

  const onMessage = (message: MessageEvent): void => {
    console.warn(message);
  };

  useEffect(() => {
    webWorker = new Worker('./decodeWorker.ts');
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
      <Webcam
        style={style}
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
  style: { width: '100%' },
  buttonMode: true,
} as defaultProps;

export default QrScanner;
