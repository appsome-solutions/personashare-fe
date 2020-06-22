import React, { FC } from 'react';
import styled from 'styled-components';
import { Row } from 'antd';
import { Tabs } from 'antd';
import { TopNav } from 'components/TopNav/TopNav';
import { VisibilitySpot } from 'pages/MySpotPreview/VisibilitySpot';
import { NetworkSpot } from 'pages/MySpotPreview/NetworkSpot';
import { MySpotPreview } from 'pages/MySpotPreview/MySpotPreview';
const { TabPane } = Tabs;

const StyledRow = styled(Row)`
  .ant-tabs {
    width: 100%;
  }
  .ant-tabs-nav {
    height: 40px;
    width: 100%;
  }
`;

const CenteredCol = styled(Tabs)`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
    .ant-tabs-nav-list {
      width: 100%;
      justify-content: space-between;
    }
    && .ant-tabs-tab {
      border-radius: 0px;
      margin: 0px;
      border: 0px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      background-color: ${(props) => props.theme.colors.main.primary};
      color: ${(props) => props.theme.colors.utils.background.light};
      ${(props) => props.theme.typography.subtitle2};
    }
    .ant-tabs-ink-bar {
      visibility: visible;
      background-color: ${(props) => props.theme.colors.utils.background.light};
    }
    .ant-tabs-content-holder {
      width: 100%;
    }
    .ant-tabs-nav {
      margin: 0px;
    }
    .ant-tabs-nav-list {
      background-color: ${(props) => props.theme.colors.main.primary};
    }
  }
`;

export const NavigationSpotStats: FC = () => {
  return (
    <>
      <TopNav isWithBackArrow />
      <StyledRow justify="center">
        <CenteredCol defaultActiveKey="1" type="card">
          <TabPane tab="PERSONA" key="1">
            <MySpotPreview />
          </TabPane>
          <TabPane tab="VISIBILITY" key="2">
            <VisibilitySpot />
          </TabPane>
          <TabPane tab="NETWORK" key="3">
            <NetworkSpot />
          </TabPane>
        </CenteredCol>
      </StyledRow>
    </>
  );
};
