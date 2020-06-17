import React, { FC } from 'react';
import { TopNav } from 'components/TopNav/TopNav';
import { StatsNavigationPersona } from 'components/Statistics/StatsNavigationPersona';
import styled from 'styled-components';
import { InfoCard } from 'components/InfoCard/InfoCard';
import { useLocation } from 'react-router-dom';
import { StatsNavigationSpot } from '../Statistics/StatsNavigationSpot';
import { CardsGrid } from './CardsGrid';

export interface PropsType {
  gridCardValue: any;
  savedOrRecommend: string;
  spotsOrPersonsText: string;
  link: any;
  visibilityOrNetwork: string;
}

const PersonaPreviewWrapper = styled.div`
  height: ${(props) => props.theme.contentHeight};
  overflow: auto;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.utils.background.mid};
  padding: 0 16px 28px 16px;
`;

const InformationUnderText = styled(InfoCard)`
  margin: 40px 0 46px 0;
`;

const TextInInfo = styled.div`
  ${(props) => props.theme.typography.subtitle2};
`;

export const VisibilityOrNetwork: FC<PropsType> = ({
  gridCardValue,
  savedOrRecommend,
  spotsOrPersonsText,
  link,
  visibilityOrNetwork,
}) => {
  const { pathname } = useLocation();
  return (
    <>
      <TopNav isWithBackArrow />
      {pathname.includes('persona') ? <StatsNavigationPersona /> : <StatsNavigationSpot />}
      <PersonaPreviewWrapper>
        <InformationUnderText title="">
          <TextInInfo>
            In a {visibilityOrNetwork} tab you can see how many people {savedOrRecommend} your default persona.
          </TextInInfo>
        </InformationUnderText>
        <CardsGrid
          isWithAddParticipate={false}
          isWithText={true}
          gridCardValue={gridCardValue}
          savedOrRecommend={savedOrRecommend}
          spotsOrPersonsText={spotsOrPersonsText}
          link={link}
        />
      </PersonaPreviewWrapper>
    </>
  );
};
