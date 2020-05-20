import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Button } from 'components/Button/Button';
import LogoWithoutBG from 'assets/logo_nobg.svg';
import useLocalStorage from 'react-use-localstorage';
import { NavLink } from 'react-router-dom';
import { APP_ROUTES } from 'global/AppRouter/routes';

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

const PersonaIcon = styled.img``;

const ButtonAccept = styled(Button)`
  width: auto;
`;

export const TermAndCookies: FunctionComponent = () => {
  const [isVisible, setIsVisible] = useLocalStorage('isVisible', 'true');

  if (isVisible === 'false') {
    return null;
  }

  return (
    <CookiesBarStyled>
      <PersonaIcon alt="cookie icon" src={LogoWithoutBG} />
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
          <TextHere>privacy and cookies policy</TextHere>.
        </NavLink>
      </CookieText>
      <ButtonAccept onClick={() => setIsVisible('false')}>I UNDERSTAND</ButtonAccept>
    </CookiesBarStyled>
  );
};
