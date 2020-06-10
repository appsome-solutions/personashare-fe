import React from 'react';
import styled from 'styled-components';
import { Row } from 'antd';
import { withRouter } from 'react-router-dom';
import { APP_ROUTES } from 'global/AppRouter/routes';
import { NavigationElementStats } from './NavigationElementStats';
import { useParams } from 'react-router-dom';

const StyledRow = styled(Row)`
  background-color: ${(props) => props.theme.colors.main.primary};
  border-top-width: 0px;
  height: 52px;
  width: 100%;
  position: sticky;
  bottom: 0;
`;

export const StatsNavigationSpot = withRouter(({ location: { pathname } }) => {
  const { uuid } = useParams();

  return (
    <StyledRow justify="center">
      <NavigationElementStats
        isActive={pathname === APP_ROUTES.MY_SPOT_PREVIEW(`${uuid}`)}
        text="SPOT"
        redirectionLink={APP_ROUTES.MY_SPOT_PREVIEW(`${uuid}`)}
      />
      <NavigationElementStats
        isActive={pathname === APP_ROUTES.MY_SPOT_PREVIEW_TAB(`${uuid}`, 'visibility')}
        text="VISIBILITY"
        redirectionLink={APP_ROUTES.MY_SPOT_PREVIEW_TAB(`${uuid}`, 'visibility')}
      />
      <NavigationElementStats
        isActive={pathname === APP_ROUTES.MY_SPOT_PREVIEW_TAB(`${uuid}`, 'network')}
        text="NETWORK"
        redirectionLink={APP_ROUTES.MY_SPOT_PREVIEW_TAB(`${uuid}`, 'network')}
      />
    </StyledRow>
  );
});
