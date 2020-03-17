import React, { useState } from 'react';
import { Drawer } from 'antd';
import styled from 'styled-components';

const StyledDrawer = styled(Drawer)`
  .ant-drawer-content {
    background-color: ${props => props.theme.colors.utils.background.mid};
  }

  .ant-drawer-body {
    padding: 0;
  }
`;

type DrawerPageProps = {
  title: string;
  children: JSX.Element | string;
  onClose: () => void;
  OnClickComponent: React.ElementType;
  isVisible: boolean;
};

const TitleMenu = styled.div`
  ${props => props.theme.typography.body2}
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
  padding: 16px;
  font-weight: 500;

  background-color: ${props => props.theme.colors.main.primary};
  color: ${props => props.theme.colors.utils.text.light};

  display: flex;
  justify-content: center;
`;

const CancelLink = styled.a`
  position: absolute;
  right: 16px;
  color: ${props => props.theme.colors.utils.text.light};
`;

const OnClickComponentWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DrawerPage = ({ title, children, onClose, OnClickComponent, isVisible = true }: DrawerPageProps) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <OnClickComponentWrapper onClick={() => setIsOpened(true)}>
        <OnClickComponent />
      </OnClickComponentWrapper>
      <StyledDrawer
        placement="bottom"
        onClose={() => {
          setIsOpened(false);
        }}
        visible={isVisible && isOpened}
        height="100vh"
        closable={false}
      >
        <TitleMenu>
          {title}
          <CancelLink
            onClick={() => {
              onClose();
              setIsOpened(false);
            }}
          >
            Cancel
          </CancelLink>
        </TitleMenu>
        {children}
      </StyledDrawer>
    </>
  );
};
