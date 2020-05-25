import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Button } from 'components/Button/Button';
import LogoWithoutBG from 'assets/logo_nobg.svg';
import useLocalStorage from 'react-use-localstorage';
import { NavLink } from 'react-router-dom';
import { APP_ROUTES } from 'global/AppRouter/routes';
import LinkIn from 'assets/LinkIn.svg';
import FbIcon from 'assets/FbIcon.svg';

const CookiesBarStyled = styled.div`
  display: flex;
  padding: 27px 21px;
  flex-direction: column;
  background-color: ${props => props.theme.colors.utils.background.light};
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  position: sticky;
  bottom: 50px;
  justify-content: center;
  text-align: center;
`;

const CookieText = styled.p`
  ${props => props.theme.typography.caption};
  color: ${props => props.theme.colors.utils.text.dark};
`;

const TextHere = styled.span`
  ${props => props.theme.typography.caption};
  color: ${props => props.theme.colors.main.secondary};
  text-decoration-line: ${props => props.theme.textDecorationLine};
  text-decoration-skip: spaces;
`;

// @ts-ignore
const ButtonAccept = styled(Button)`
  width: 160px;
`;

const LinkedInBox = styled.div`
  margin-right: 8px;
  margin-left: 8px;
`;

const ImgAndButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ImgHeight = styled.img`
  height: 36px;
`;

export const TermAndCookies: FunctionComponent = () => {
  const [isVisible, setIsVisible] = useLocalStorage('isVisible', 'true');

  if (isVisible === 'false') {
    return null;
  }

  return (
    <CookiesBarStyled>
      <img alt="cookie icon" src={LogoWithoutBG} />
      <CookieText>
        Welcome to PersonaShare!
        <br />
        By using this website you accept our{' '}
        <NavLink to={APP_ROUTES.TERM_OF_USE}>
          <TextHere>term of service</TextHere>.
        </NavLink>{' '}
        We are all #PersonashareFamily so we care about your privacy. This website uses cookies. By using this website
        you agree with our <br />
        <NavLink to={APP_ROUTES.PRIVACY_AND_COOKIES_POLICY}>
          <TextHere>privacy and cokies policy</TextHere>.
        </NavLink>
      </CookieText>
      <ImgAndButtonBox>
        <a href="https://www.facebook.com/PersonaShare-110785183877737">
          <ImgHeight alt="Facebook icon" src={FbIcon} />
        </a>
        <LinkedInBox>
          <a href="https://www.linkedin.com/groups/8868704/?fbclid=IwAR1ET4HY6Tx14BCHpwz0Con4mopJV5UScAK9Gt26eZ8SKkQu3XSGvDdDh28">
            <ImgHeight alt="LinkedIn icon" src={LinkIn} />
          </a>
        </LinkedInBox>
        <ButtonAccept onClick={() => setIsVisible('false')}>I UNDERSTAND</ButtonAccept>
      </ImgAndButtonBox>
    </CookiesBarStyled>
  );
};
