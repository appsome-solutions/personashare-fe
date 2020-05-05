import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from 'global/AppRouter/routes';

type LoginBarProps = {
  isLogged?: boolean;
};

const LoginBarMenuStyled = styled.div`
  padding: 12px 16px;
  height: 56px;
  background-color: ${props => props.theme.colors.main.primary};
  display: flex;
`;

const LoginButton = styled.div`
  display: flex;
  align-items: center;
  ${props => props.theme.typography.subtitle1};
  :hover {
    background-color: rgba(85, 133, 255, 0.2);
  }
`;

const StyledLink = styled(Link)`
  color: ${props => props.theme.colors.utils.background.light};
  text-decoration: none;
`;

export const LoginBar: FC<LoginBarProps> = ({ isLogged }) => {
  return (
    <>
      {isLogged && (
        <LoginBarMenuStyled>
          <LoginButton>
            <StyledLink to={APP_ROUTES.LOGIN}>LOGIN</StyledLink>
          </LoginButton>
        </LoginBarMenuStyled>
      )}
    </>
  );
};
