import React, { FC } from 'react';
import styled from 'styled-components';
import { InfoCard } from '../../components/InfoCard/InfoCard';
import { CheckVisibilitySpot } from '../../components/EntityPreview/SpotPreview/CheckVisibilitySpot';
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

export const VisibilityTabSpot: FC = () => {
  return (
    <>
      <TopNav isWithBackArrow />
      <StatsNavigationSpot />
      <PersonaPreviewWrapper>
        <InformationUnderText title="">
          <TextInInfo>In a visibility tab you can see how many people saved your spot.</TextInInfo>
        </InformationUnderText>
        <CheckVisibilitySpot />
      </PersonaPreviewWrapper>
    </>
  );
};
