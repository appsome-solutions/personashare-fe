import React from 'react';
import styled from 'styled-components';
import { Row } from 'antd';
import { withRouter } from 'react-router-dom';
import QrCodeNavSvg from 'assets/qr-code-nav.svg';
import MenuBookSvg from 'assets/menu_book.svg';
import MyLocationSvg from 'assets/my_location.svg';
import { NavigationElement } from './NavigationElement/NavigationElement';
import { APP_ROUTES } from 'global/AppRouter/routes';
import { useTranslation } from 'react-i18next';

const StyledRow = styled(Row)`
  background-color: ${(props) => props.theme.colors.utils.background.light};
  border-top: 2px solid ${(props) => props.theme.colors.functional.disabled};
  height: 52px;
  width: 100%;
  position: sticky;
  bottom: 0;
`;

export const StickyNavigation = withRouter(({ location: { pathname } }) => {
  const { t } = useTranslation();

  return (
    <StyledRow justify="center">
      <NavigationElement
        isActive={pathname === APP_ROUTES.SCANNER}
        svg={QrCodeNavSvg}
        text={t('BOTNAV_SCANNER')}
        redirectionLink={APP_ROUTES.SCANNER}
      />
      <NavigationElement
        isActive={pathname === APP_ROUTES.SPOT_BOOK}
        svg={MyLocationSvg}
        text={t('BOTNAV_SPOT_BOOK')}
        redirectionLink={APP_ROUTES.SPOT_BOOK}
      />
      <NavigationElement
        isActive={pathname === APP_ROUTES.CONTACT_BOOK}
        svg={MenuBookSvg}
        text={t('BOTNAV_CONTACT_BOOK')}
        redirectionLink={APP_ROUTES.CONTACT_BOOK}
      />
    </StyledRow>
  );
});
