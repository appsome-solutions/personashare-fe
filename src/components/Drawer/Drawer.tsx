import styled, { ThemeContext } from 'styled-components';
import React, { useContext, useState, Children, isValidElement, cloneElement, FC, HTMLAttributes } from 'react';
import { Drawer } from 'antd';
import { Icon } from 'components/Icon';
import HamburgerMenuSvg from 'assets/HamburgerMenu.svg';

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

export const DrawerMenu: FC = ({ children }) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const themeContext = useContext(ThemeContext);

  return (
    <>
      <HamburgerMenuIcon color={themeContext.colors.main.tetiary} onClick={() => setIsMenuOpened(true)} />
      <StyledDrawer placement="left" closable={false} onClose={() => setIsMenuOpened(false)} visible={isMenuOpened}>
        <HeaderDivider />
        <DrawerWrapper>
          {Children.map(children, (child) => {
            if (isValidElement(child)) {
              return cloneElement<HTMLAttributes<any>>(child, {
                onClick: () => {
                  setIsMenuOpened(false);
                  child.props.onClick && child.props.onClick();
                },
              });
            }

            return child;
          })}
        </DrawerWrapper>
      </StyledDrawer>
    </>
  );
};
