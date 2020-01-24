import React, { useState } from 'react';
import { Drawer } from 'antd';
import styled from 'styled-components';

const StyledDrawer = styled(Drawer)`
  .ant-drawer-content {
    background-color: ${props => props.theme.colors.utils.background.mid};
  }
`;

type DrawerPageProps = {
  children: JSX.Element | string;
  OnClickComponent: any;
};

export const DrawerPage = ({ children, OnClickComponent }: DrawerPageProps) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <div
        onClick={() => {
          console.log('clicked');
          setIsOpened(true);
        }}
      >
        <OnClickComponent />
      </div>
      <StyledDrawer
        placement="bottom"
        onClose={() => setIsOpened(false)}
        visible={isOpened}
        height="100vh"
        closable={false}
      >
        <button onClick={() => setIsOpened(false)}> Close </button>
        {children}
      </StyledDrawer>
    </>
  );
};
