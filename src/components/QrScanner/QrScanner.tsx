import React, { useCallback, RefObject } from 'react';
import styled from 'styled-components';
import Webcam from 'react-webcam';
import { QRCode } from 'jsqr';
import getPixels from 'get-pixels';
import VideoOverlay from './VideoOverlay';
import { useWorkerDecode } from './hooks/useWorkerDecode';
import { HamburgerMenu } from 'global/Layouts/HamburgerMenu/HamburgerMenu';
import { LoginBar } from '../LoginBar/LoginBar';
import { useQuery } from '@apollo/react-hooks';
import { GET_USER } from '../../global/graphqls/User';
import { GET_PERSONA, GetCardType } from '../../global/graphqls/Persona';
import { gqlUser } from '../../global/graphqls/schema';

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
  const { data } = useQuery<{ user: gqlUser }>(GET_USER);
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

  const LoginOrHamburger = () => {
    const { data: personaData } = useQuery<GetCardType>(GET_PERSONA, {
      variables: { uuid: data?.user.defaultPersona },
    });

    if (!data) {
      return <LoginBar isLogged={true} />;
    } else if (personaData && data) {
      return (
        <HamburgerMenu isWithHamburger={true} uuid={data?.user.defaultPersona} card={personaData?.persona?.card} />
      );
    } else if (!personaData && data) {
      return <HamburgerMenu isWithHamburger={true} />;
    } else return null;
  };

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
