import React, { useContext, useState } from 'react';
import HamburgerMenuSvg from 'assets/HamburgerMenu.svg';
import { Icon } from 'components/Icon/Icon';
import { ThemeContext } from 'styled-components';
import { Drawer } from 'antd';
import styled from 'styled-components';
import MySpots from 'assets/MySpots.svg';
import MyPersonas from 'assets/MyPersonas.svg';
import RightProfileSvg from 'assets/RightProfileSvg.svg';
import LogoutSvg from 'assets/Logout.svg';
import { NavLink, useHistory } from 'react-router-dom';
import { PS_TOKEN_NAME } from 'global/ApolloClient/ApolloClient';
import { SIGN_OUT, SignOutResponse } from 'global/graphqls/SignOut';
import { useMutation } from '@apollo/react-hooks';
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
  text-decoration: none
  :hover {
    background-color: rgba(85, 133, 255, 0.2);
  }
`;

const DrawerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  font-size: 18px;
  background-color: ${props => props.theme.colors.utils.background.mid.color};
`;

const MenuDivider = styled.div`
  height: 24px;
  background-color: ${props => props.theme.colors.utils.text.dark};
`;

const HamburgerMenuIcon = styled(Icon).attrs({
  svgLink: HamburgerMenuSvg,
})`
  margin-right: 36px;
  background-color: ${props => props.theme.colors.utils.background.light};
  height: 20px;
  width: 30px;
`;

const StyledDrawer = styled(Drawer).attrs({
  width: 'calc(100% - 56px)',
})`
  .ant-drawer-body {
    padding: 0;
  }
  &&& .ant-drawer-content-wrapper {
    height: auto;
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
  text-decoration: none
  :hover {
   background-color: rgba(85, 133, 255, 0.2);
    }
  `;

export const HamburgerMenu = ({ isWithHamburger, isWithSearch }: HamburgerMenuType) => {
  const themeContext = useContext(ThemeContext);
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const history = useHistory();
  const [logout] = useMutation<SignOutResponse>(SIGN_OUT);

  return (
    <>
      {isWithHamburger && (
        <HamburgerMenuStyled>
          <HamburgerMenuIcon color={themeContext.colors.main.tetiary} onClick={() => setIsMenuOpened(true)} />
          <StyledDrawer placement="left" closable={false} onClose={() => setIsMenuOpened(false)} visible={isMenuOpened}>
            <MenuDivider />
            <DrawerWrapper>
              <LinkRouterStyle to="/my-personas">
                <HamburgerIcon svgLink={MyPersonas} />
                <TextInHamburger>My personas</TextInHamburger>
              </LinkRouterStyle>
              <LinkRouterStyle to="/my-spots">
                <HamburgerIcon svgLink={MySpots} />
                <TextInHamburger>My spots</TextInHamburger>
              </LinkRouterStyle>
              <LogoutButton
                onClick={async () => {
                  await logout();
                  localStorage.removeItem(PS_TOKEN_NAME);
                  history.push('./login');
                }}
              >
                <HamburgerIcon svgLink={LogoutSvg} />
                <TextInHamburger>Logout</TextInHamburger>
              </LogoutButton>
            </DrawerWrapper>
          </StyledDrawer>
          {isWithSearch && <SearchPositionBox />}
          <DrawerMenu>
            <LinkRouterStyle to="/my-personas">
              <HamburgerIcon svgLink={MyPersonas} />
              <TextInHamburger>My personas</TextInHamburger>
            </LinkRouterStyle>
            <LinkRouterStyle to="/my-spots">
              <HamburgerIcon svgLink={MySpots} />
              <TextInHamburger>My spots</TextInHamburger>
            </LinkRouterStyle>
            <LogoutButton
              onClick={async () => {
                await logout();
                localStorage.removeItem(PS_TOKEN_NAME);
                history.push('./login');
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
