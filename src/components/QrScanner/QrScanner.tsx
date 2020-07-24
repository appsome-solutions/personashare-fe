import React, { useCallback, RefObject, useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Webcam from 'react-webcam';
import { QRCode } from 'jsqr';
import getPixels from 'get-pixels';
import VideoOverlay from './VideoOverlay';
import { useWorkerDecode } from './hooks/useWorkerDecode';
import { LoginOrHamburger } from './LoginOrHamburger';
import { useHistory } from 'react-router-dom';
import { Alert, Slider } from 'antd';
/* eslint-disable-next-line */
import Worker from 'worker-loader!./../decodeWorker.worker';
import { vh } from 'helpers/styled';
import { Icon } from 'components/Icon';
import AddSvg from 'assets/add-24px.svg';
import RemoveSvg from 'assets/remove.svg';

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
  height: ${(props) => props.theme.contentHeight};
  object-fit: fill;
`;

const AlertWrapper = styled.div`
  width: 100%;
  height: ${(props) => props.theme.contentHeight};
`;

type defaultProps = {
  videoConstraints: MediaTrackConstraints;
  interval: number;
  buttonMode: boolean;
  className: string;
  onError: (error: string) => void;
};

type Props = {
  onCode?: (code: QRCode) => void;
  onUserMediaError?: (error: string) => void;
} & defaultProps;

export type ImagePixels = {
  data: Uint8ClampedArray;
  offset: number;
  shape: number[];
  stride: number[];
};

const StyledSlider = styled(Slider)`
  position: absolute;
  z-index: 1000;
  height: calc(${vh(100)} - 230px);
  left: 8px;
  top: 105px;
`;

const StyledAddIcon = styled(Icon)`
  position: absolute;
  left: 12px;
  top: 75px;
  z-index: 1000;
  background-color: ${(props) => props.theme.colors.utils.text.light};
`;

const StyledRemoveIcon = styled(Icon)`
  position: absolute;
  left: 12px;
  bottom: 75px;
  z-index: 1000;
  background-color: ${(props) => props.theme.colors.utils.text.light};
`;

const Zoom = ({ webcamRef }: any) => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10);
  const [step, setStep] = useState(1);
  const [isZoomSupported, setIsZoomSupported] = useState(false);

  useEffect(() => {
    // todo: think about better way of doing it
    for (let time = 300; time <= 1500; time += 300) {
      setTimeout(() => {
        if (isZoomSupported || !webcamRef.current) {
          return;
        }
        const track = webcamRef.current.stream.getVideoTracks()[0];
        const capabilities = track.getCapabilities();
        // const settings = track.getSettings();

        // not supported zoom
        if (!('zoom' in capabilities)) {
          return;
        }
        setIsZoomSupported(true);
        setMin(capabilities.zoom.min);
        setMax(capabilities.zoom.max);
        setStep(capabilities.zoom.step);
      }, time);
    }
  });

  if (!webcamRef || !isZoomSupported) {
    return null;
  }

  return (
    <>
      <StyledAddIcon svgLink={AddSvg} />
      <StyledSlider
        min={min}
        max={max}
        vertical
        onChange={(value) =>
          webcamRef.current.stream.getVideoTracks()[0].applyConstraints({ advanced: [{ zoom: value }] })
        }
        step={step}
      />
      <StyledRemoveIcon svgLink={RemoveSvg} />
    </>
  );
};

export const QrScanner = ({ onError, onUserMediaError, className, videoConstraints, interval, buttonMode }: Props) => {
  const workerRef = useRef<Worker | null>(null);
  const { t } = useTranslation();
  const [isWebcamSupported, setIsWebcamSupported] = useState(true);
  const history = useHistory();
  const redirectToQr = useCallback((decodedQr: QRCode): void => {
    try {
      history.push(new URL(decodedQr.data).pathname);
    } catch (e) {
      console.error(`${t('GOT_INCORRECT_QR')}`);
      console.error(decodedQr);
    }
  }, []);
  const [isWebcamStreamVisible, setIsWebcamStreamVisible] = useState(false);
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
      workerRef?.current?.postMessage(image);
    });
  }, [webcamRef, onError]);

  useWorkerDecode({ capture, interval: interval, onCode: redirectToQr, workerRef });

  // commented due to issues on some devices, it should catch in case of old browser or messengers web view
  /*  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).catch(() => {
      setIsWebcamSupported(false);
    });
  }, []);*/

  return (
    <>
      <LoginOrHamburger />
      <Wrapper>
        {isWebcamSupported ? (
          <>
            <VideoOverlay />
            {isWebcamStreamVisible && <Zoom webcamRef={webcamRef} />}
            <StyledWebcam
              className={className}
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              screenshotQuality={1}
              forceScreenshotSourceSize
              videoConstraints={videoConstraints}
              onUserMedia={() => {
                if (!isWebcamStreamVisible) {
                  setIsWebcamStreamVisible(true);
                }
              }}
              onUserMediaError={(error: any) => {
                setIsWebcamSupported(false);
                onUserMediaError?.(error);
              }}
            />
            {buttonMode ? <Button onClick={capture} /> : null}
          </>
        ) : (
          <AlertWrapper>
            <Alert message="Info" description={t('SCANNER_INFO')} type="info" showIcon />
          </AlertWrapper>
        )}
      </Wrapper>
    </>
  );
};

const defaultInterval = 1250;

QrScanner.defaultProps = {
  videoConstraints: { facingMode: 'environment' },
  interval: defaultInterval,
  onError: (err: string) => {
    console.error(err);
  },
  buttonMode: false,
} as defaultProps;
