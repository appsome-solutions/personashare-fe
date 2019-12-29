import React from 'react';
import styled from 'styled-components';
import { Row } from 'antd';
import { withRouter } from 'react-router-dom';
import QrCodeNavSvg from 'assets/qr-code-nav.svg';
import MenuBookSvg from 'assets/menu_book.svg';
import MyLocationSvg from 'assets/my_location.svg';
import { NavigationElement } from './NavigationElement/NavigationElement';

const StyledRow = styled(Row)`
  background-color: ${props => props.theme.colors.utils.background.light};
  border-top: 2px solid ${props => props.theme.colors.functional.disabled};
  height: 52px;
  width: 100%;
  position: sticky;
  bottom: 0;
`;

export const StickyNavigation = withRouter(({ location: { pathname } }) => {
  return (
    <StyledRow type="flex" justify="center">
      <NavigationElement
        isActive={pathname === '/scanner'}
        svg={QrCodeNavSvg}
        text="Scanner"
        redirectionLink={'/scanner'}
      />
      <NavigationElement isActive={pathname === '/spots'} svg={MyLocationSvg} text="Spots" redirectionLink={'/spots'} />
      <NavigationElement
        isActive={pathname === '/personas'}
        svg={MenuBookSvg}
        text="Personas"
        redirectionLink={'/personas'}
      />
    </StyledRow>
  );
});
