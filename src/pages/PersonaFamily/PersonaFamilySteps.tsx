import React, { FC } from 'react';
import { TopNav } from 'components/TopNav/TopNav';
import { WideButton } from 'components/Button/WideButton';
import { Stepper } from 'components/Stepper';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

export interface PersonaFamilyProps {
  redirectLink: string;
  textInComponent: any;
  linkInHref: string;
  buttonText: any;
  logo: string;
  currentNumber: number;
}

const MainComponent = styled.div`
  background-color: ${(props) => props.theme.colors.utils.background.mid};
  min-height: ${(props) => props.theme.contentHeight};
  padding: 32px 24px 0 24px;
`;

const TextAndButtonsComponent = styled.div`
  flex-direction: column;
  display: flex;
  justify-align: center;
  align-items: center;
`;

const TextComponent = styled.div`
  text-align: left;
  font-size: 13px;
  line-height: 15px;
`;

const StepperStyled = styled.div`
  margin-bottom: 32px;
`;

const WideButtonStyled = styled(WideButton)`
  margin-top: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImgStyled = styled.img`
  margin-top: 76px;
  margin-bottom: 100px;
`;

export const PersonaFamilySteps: FC<PersonaFamilyProps> = ({
  redirectLink,
  textInComponent,
  linkInHref,
  buttonText,
  logo,
  currentNumber,
}) => {
  const history = useHistory();
  const onNextClick = (): void => {
    history.push({
      pathname: redirectLink,
    });
  };

  return (
    <>
      <TopNav isWithBackArrow />
      <MainComponent>
        <StepperStyled>
          <Stepper items={[1, 2, 3, 4]} current={currentNumber} mb={31} />
        </StepperStyled>
        <TextAndButtonsComponent>
          <TextComponent>{textInComponent}</TextComponent>
          <a href={linkInHref}>
            <ImgStyled src={logo} />
          </a>
          <WideButtonStyled onClick={onNextClick}>{buttonText}</WideButtonStyled>
        </TextAndButtonsComponent>
      </MainComponent>
    </>
  );
};
