import React, { FC } from 'react';
import styled from 'styled-components';
import { CheckNetworkListSpot } from '../../components/EntityPreview/SpotPreview/CheckNetworkListSpot';
import { InfoCard } from '../../components/InfoCard/InfoCard';
import { TopNav } from '../../components/TopNav/TopNav';
import { StatsNavigationSpot } from '../../components/Statistics/StatsNavigationSpot';

const PersonaPreviewWrapper = styled.div`
  height: ${(props) => props.theme.contentHeight};
  overflow: auto;
  margin: 0 16px 28px 16px;
  display: flex;
  flex-direction: column;
`;

const InformationUnderText = styled(InfoCard)`
  margin: 40px 0 46px 0;
`;

const TextInInfo = styled.div`
  ${(props) => props.theme.typography.subtitle2};
`;

export const NetworkTabSpot: FC = () => {
  return (
    <>
      <TopNav isWithBackArrow />
      <StatsNavigationSpot />
      <PersonaPreviewWrapper>
        <InformationUnderText title="">
          <TextInInfo>In a network tab you can see how many people recommend your spot.</TextInInfo>
        </InformationUnderText>
        <CheckNetworkListSpot />
      </PersonaPreviewWrapper>
    </>
  );
};
