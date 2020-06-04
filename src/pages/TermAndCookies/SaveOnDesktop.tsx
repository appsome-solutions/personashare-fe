import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Button } from 'components/Button/Button';
import Rocket from 'assets/rocket.svg';
import useLocalStorage from 'react-use-localstorage';

const SaveOnDesktopStyled = styled.div`
  display: flex;
  padding: 12px 20px;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.utils.background.light};
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  position: sticky;
  text-align: center;
`;

const CloseSign = styled.div`
  text-align: right;
`;

const CookieText = styled.p`
  ${(props) => props.theme.typography.caption};
  color: ${(props) => props.theme.colors.utils.text.dark};
`;

const ButtonAccept = styled(Button)`
  width: auto;
`;

const ImgWithText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const ImgStyled = styled.div`
  margin-right: 32px;
`;

export const SaveOnDesktop: FunctionComponent = () => {
  const [isSave, setIsSave] = useLocalStorage('isSave', 'true');

  if (isSave === 'false') {
    return null;
  }

  return (
    <SaveOnDesktopStyled>
      <CloseSign onClick={() => setIsSave('false')}>x</CloseSign>
      <ImgWithText>
        <ImgStyled>
          <img alt="rocket icon" src={Rocket} />
        </ImgStyled>
        <CookieText>
          Save PersonaShare on desktop
          <br />
          to share and scan immediately
        </CookieText>
      </ImgWithText>
      <ButtonAccept>SAVE!</ButtonAccept>
    </SaveOnDesktopStyled>
  );
};
