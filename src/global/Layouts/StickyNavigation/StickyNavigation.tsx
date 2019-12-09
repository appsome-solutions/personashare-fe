import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import { Icon } from 'components/Icon/Icon';
import QrCodeNavSvg from 'assets/qr-code-nav.svg';

const StyledRow = styled(Row)`
  background-color: ${props => props.theme.colors.utils.background.light};
  height: 48px;
  width: 100%;
  position: absolute;
  bottom: 0;
`;

type MenuIcon = {
  isActive: boolean;
};

const MenuIcon = styled(Icon)<MenuIcon>`
  background-color: ${props =>
    props.isActive ? props.theme.colors.main.primary : props.theme.colors.functional.disabled};
`;

const CenteredCol = styled(Col)`
  && {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const StickyNavigation = () => {
  return (
    <StyledRow type="flex" justify="center">
      <CenteredCol span={8}>
        <MenuIcon svgLink={QrCodeNavSvg} isActive={true} />
      </CenteredCol>
      <CenteredCol span={8}>col-4</CenteredCol>
      <CenteredCol span={8}>col-4</CenteredCol>
    </StyledRow>
  );
};
