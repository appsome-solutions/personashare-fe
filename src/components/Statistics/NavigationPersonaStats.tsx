import React, { FC } from 'react';
import styled from 'styled-components';
import { Row } from 'antd';
import { Tabs } from 'antd';
import { MyPersonasPreview } from 'pages/MyPersonaPreview/MyPersonasPreview';
import { VisibilityPersona } from 'pages/MyPersonaPreview/VisibilityPersona';
import { NetworkPersona } from 'pages/MyPersonaPreview/NetworkPersona';
import { TopNav } from 'components/TopNav/TopNav';
import { useTranslation } from 'react-i18next';
import { StickyNavigation } from '../../global/Layouts/StickyNavigation/StickyNavigation';
const { TabPane } = Tabs;

const CenteredCol = styled(Tabs)`
  .ant-tabs {
    width: 100%;
  }
  .ant-tabs-nav {
    height: 40px;
    width: 100%;

    position: fixed;
    top: 56px;
    z-index: 999;
  }

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
      padding-top: 40px;
    }
    .ant-tabs-nav {
      margin: 0px;
    }
    .ant-tabs-nav-list {
      background-color: ${(props) => props.theme.colors.main.primary};
    }
  }
`;

export const NavigationPersonaStats: FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <TopNav isWithBackArrow />
      <CenteredCol defaultActiveKey="1" type="card">
        <TabPane tab="PERSONA" key="1">
          <MyPersonasPreview />
        </TabPane>
        <TabPane tab={t('MY_PERSONA_UUID_VISIBILITY')} key="2">
          <VisibilityPersona />
        </TabPane>
        <TabPane tab={t('MY_PERSONA_UUID_NETWORK')} key="3">
          <NetworkPersona />
        </TabPane>
      </CenteredCol>
      <StickyNavigation />
    </>
  );
};
