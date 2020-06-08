import React, { FC, useState, useRef, useEffect, useCallback } from 'react';
import styled, { css } from 'styled-components';
import ReactCardFlip from 'react-card-flip';

import { Stepper } from 'components/Stepper';
import { Overlay } from 'components/Overlay/Overlay';
import { WideButton } from 'components/Button';

import { TakeYourPhone } from './TakeYourPhone/TakeYourPhone';
import { GoOn } from './GoOn/GoOn';
import { QrCode } from './QrCode/QrCode';

const FlexCenterStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StepContentWrapper = styled.div`
  flex-direction: column;
  ${FlexCenterStyle}
`;

const GuideCard = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.utils.background.light};
  box-shadow: 8px 8px 36px rgba(0, 0, 0, 0.25);
  width: 387px;
  height: 534px;
  padding: 36px 46px;
`;

const FlexOverlay = styled(Overlay)`
  ${FlexCenterStyle}
`;

export const GuideText = styled.div`
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  text-align: center;
  letter-spacing: 0.0125em;
  text-transform: uppercase;
`;

const GuideButton = styled(WideButton)`
  &&& {
    &:hover {
      background-color: ${(props) => props.theme.colors.main.primary};
    }
  }
`;

const steps = [1, 2, 3];

const stepMapper = [TakeYourPhone, GoOn, QrCode];

type GuideProps = {
  onOutsideClick(): void;
};

export const Guide: FC<GuideProps> = ({ onOutsideClick }: GuideProps) => {
  const [step, setStep] = useState(1);
  const cardFrontRef = useRef<HTMLDivElement>(null);
  const cardBackRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: any): void => {
      if (
        cardFrontRef.current &&
        cardBackRef.current &&
        !cardFrontRef.current.contains(event.target) &&
        !cardBackRef.current.contains(event.target)
      ) {
        onOutsideClick();
      }
    },
    [cardBackRef, cardFrontRef, onOutsideClick]
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, false);
    return () => {
      document.removeEventListener('click', handleClickOutside, false);
    };
  }, [handleClickOutside]);

  const changeStep = (): void => {
    if (step < steps.length) {
      setStep(step + 1);
    }
  };

  const CurrentStep = stepMapper[step - 1];

  return (
    <FlexOverlay>
      <ReactCardFlip isFlipped={step === 2} flipDirection="horizontal" infinite>
        <GuideCard ref={cardFrontRef}>
          <StepContentWrapper>
            <Stepper items={steps} current={step} />
            <CurrentStep />
          </StepContentWrapper>
          <GuideButton onClick={changeStep}>NEXT STEP</GuideButton>
        </GuideCard>

        <GuideCard ref={cardBackRef}>
          <StepContentWrapper>
            <Stepper items={steps} current={step} />
            <GoOn />
          </StepContentWrapper>
          <GuideButton onClick={changeStep}>NEXT STEP</GuideButton>
        </GuideCard>
      </ReactCardFlip>
    </FlexOverlay>
  );
};
