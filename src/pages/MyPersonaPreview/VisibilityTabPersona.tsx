import React, { FC } from 'react';
import { TopNav } from 'components/TopNav/TopNav';
import { StatsNavigationPersona } from 'components/Statistics/StatsNavigationPersona';
import { CheckVisibilityPersona } from 'components/EntityPreview/PersonaPreview/CheckVisibilityPersona';
import styled from 'styled-components';
import { InfoCard } from 'components/InfoCard/InfoCard';

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

export const VisibilityTabPersona: FC = () => {
  return (
    <>
      <TopNav isWithBackArrow />
      <StatsNavigationPersona />
      <PersonaPreviewWrapper>
        <InformationUnderText title="">
          <TextInInfo>In a network tab you can see how many people saved your default persona.</TextInInfo>
        </InformationUnderText>
        <CheckVisibilityPersona />
      </PersonaPreviewWrapper>
    </>
  );
};
