import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from 'global/AppRouter/routes';
import { useTranslation } from 'react-i18next';

type LoginBarProps = {
  isLogged?: boolean;
};

const LoginBarMenuStyled = styled.div`
  padding: 12px 16px;
  height: 56px;
  background-color: ${(props) => props.theme.colors.main.primary};
  display: flex;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const LoginButton = styled.div`
  display: flex;
  align-items: center;
  ${(props) => props.theme.typography.subtitle1};
  :hover {
    background-color: rgba(85, 133, 255, 0.2);
  }
`;

const StyledLink = styled(Link)`
  color: ${(props) => props.theme.colors.utils.background.light};
  text-decoration: none;
  text-transform: uppercase;
`;

export const LoginBar: FC<LoginBarProps> = ({ isLogged }) => {
  const { t } = useTranslation();

  return (
    <>
      {isLogged && (
        <LoginBarMenuStyled>
          <LoginButton>
            <StyledLink to={APP_ROUTES.LOGIN}>{t('TOPNAV_LOGIN')}</StyledLink>
          </LoginButton>
        </LoginBarMenuStyled>
      )}
    </>
  );
};
