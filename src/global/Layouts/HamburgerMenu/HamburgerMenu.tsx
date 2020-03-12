import React, { useContext, useState } from 'react';
import HamburgerMenuSvg from 'assets/HamburgerMenu.svg';
import { Icon } from 'components/Icon/Icon';
import { ThemeContext } from 'styled-components';
import { Drawer } from 'antd';
import styled from 'styled-components';
import MySpots from 'assets/MySpots.svg';
import MyPersonas from 'assets/MyPersonas.svg';
import RightProfileSvg from 'assets/RightProfileSvg.svg';
import SearchIcon from 'assets/SearchIcon.svg';
import LogoutSvg from 'assets/Logout.svg';
import { NavLink, useHistory } from 'react-router-dom';
import { PS_TOKEN_NAME } from 'global/ApolloClient/ApolloClient';
import { SIGN_OUT, SignOutResponse } from 'global/graphqls/SignOut';
import { useMutation } from '@apollo/react-hooks';

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
  :hover
  {
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

const SearchPositionBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const SearchImg = styled.img`
  position: absolute;
  margin-left: 8px;
`;
const SearchInputStyled = styled.input`
  width:100%
  padding-left:32px;
  background: #9db9ff;
  height: 32px;
  margin-right: 28px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-sizing: border-box;
  border-radius: 4px;
  :: placeholder{
  ${props => props.theme.typography.body2};
  color: rgba(50, 50, 93, 0.5);
  }
  :focus  {outline: none;}
  :hover {border:1px solid ${props => props.theme.colors.utils.background.light}}
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
  :hover
  {
  background-color: rgba(85, 133, 255, 0.2);
  }`;

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
          {isWithSearch && (
            <SearchPositionBox>
              <SearchInputStyled placeholder="Search..." />
              <SearchImg src={SearchIcon} alt="something " />
            </SearchPositionBox>
          )}
          <RightProfile src={RightProfileSvg} alt="Something wrong" />
        </HamburgerMenuStyled>
      )}
    </>
  );
};
