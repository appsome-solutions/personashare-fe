import React, { FC } from 'react';
import { Icon } from 'components/Icon/Icon';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import MySpots from 'assets/MySpots.svg';
import MyPersonas from 'assets/MyPersonas.svg';
import RightProfileSvg from 'assets/RightProfileSvg.svg';
import LogoutSvg from 'assets/Logout.svg';
import { NavLink, useHistory } from 'react-router-dom';
import { client, PS_TOKEN_NAME } from 'global/ApolloClient/ApolloClient';
import { SIGN_OUT, SignOutResponse } from 'global/graphqls/SignOut';
import { APP_ROUTES } from 'global/AppRouter/routes';
import { DrawerMenu } from 'components/Drawer/Drawer';
import { SearchPositionBox } from './SearchPositionBox';

type HamburgerMenuType = {
  isWithHamburger?: boolean;
  isWithSearch?: boolean;
};

const HamburgerMenuStyled = styled.div`
  padding: 12px 16px;
  height: 56px;
  background-color: ${props => props.theme.colors.main.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const HamburgerIcon = styled(Icon)`
  margin-left: 28px;
`;

const TextInHamburger = styled.div`
  margin-left: 16px;
  color: ${props => props.theme.colors.utils.text.dark};
  && {
    text-decoration: none;
  }
  ${props => props.theme.typography.subtitle2};
`;

const LinkRouterStyle = styled(NavLink)`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.main.primary}
  height: 50px;
  width:100%;
  border-radius: 4px;
  text-decoration: none;
  :hover {
    background-color: rgba(85, 133, 255, 0.2);
    }
`;

const RightProfile = styled.img`
  width: auto;
`;

const LogoutButton = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.main.primary}
  height: 50px;
  width:100%;
  border-radius: 4px;
  text-decoration: none;
  :hover {
    background-color: rgba(85, 133, 255, 0.2);
    }`;

export const HamburgerMenu: FC<HamburgerMenuType> = ({ isWithHamburger, isWithSearch }: HamburgerMenuType) => {
  const history = useHistory();
  const [logout] = useMutation<SignOutResponse>(SIGN_OUT);

  return (
    <>
      {isWithHamburger && (
        <HamburgerMenuStyled>
          <DrawerMenu>
            <LinkRouterStyle to={APP_ROUTES.MY_PERSONAS}>
              <HamburgerIcon svgLink={MyPersonas} />
              <TextInHamburger>My personas</TextInHamburger>
            </LinkRouterStyle>
            <LinkRouterStyle to={APP_ROUTES.MY_SPOTS}>
              <HamburgerIcon svgLink={MySpots} />
              <TextInHamburger>My spots</TextInHamburger>
            </LinkRouterStyle>
            <LogoutButton
              onClick={async () => {
                await logout();
                localStorage.removeItem(PS_TOKEN_NAME);
                history.push(`.${APP_ROUTES.LOGIN}`);
                client.cache.reset();
              }}
            >
              <HamburgerIcon svgLink={LogoutSvg} />
              <TextInHamburger>Logout</TextInHamburger>
            </LogoutButton>
          </DrawerMenu>
          {isWithSearch && <SearchPositionBox />}
          <RightProfile src={RightProfileSvg} alt="Profile Svg" />
        </HamburgerMenuStyled>
      )}
    </>
  );
};
