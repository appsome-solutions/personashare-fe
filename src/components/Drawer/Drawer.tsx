import styled, { ThemeContext } from 'styled-components';
import React, { useContext, useState } from 'react';
import { Drawer } from 'antd';
import { Icon } from 'components/Icon';
import HamburgerMenuSvg from 'assets/HamburgerMenu.svg';
import { CoreThemePropsType } from '../../global/Themes/CoreTheme';

const StyledDrawer = styled(Drawer).attrs(() => ({
  width: 'calc(100% - 56px)',
}))`
  .ant-drawer-body {
    padding: 0;
  }
  &&& .ant-drawer-content-wrapper {
    height: auto;
  }
`;

const HeaderDivider = styled.div`
  height: 24px;
  background-color: ${(props) => props.theme.colors.utils.text.dark};
`;

const DrawerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  font-size: 18px;
  background-color: ${(props) => props.theme.colors.utils.background.mid};
`;

const HamburgerMenuIcon = styled(Icon).attrs(() => ({
  svgLink: HamburgerMenuSvg,
}))`
  margin-right: 36px;
  background-color: ${(props) => props.theme.colors.utils.background.light};
  height: 20px;
  width: 30px;
`;

export const DrawerMenu = ({ children }: any) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const themeContext = useContext(ThemeContext);

  return (
    <>
      <HamburgerMenuIcon color={themeContext.colors.main.tetiary} onClick={() => setIsMenuOpened(true)} />
      <StyledDrawer placement="left" closable={false} onClose={() => setIsMenuOpened(false)} visible={isMenuOpened}>
        <HeaderDivider />
        <DrawerWrapper>{children}</DrawerWrapper>
      </StyledDrawer>
    </>
  );
};
