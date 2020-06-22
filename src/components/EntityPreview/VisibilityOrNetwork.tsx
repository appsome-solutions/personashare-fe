import React, { FC } from 'react';
import styled from 'styled-components';
import { InfoCard } from 'components/InfoCard/InfoCard';
import { CardsGrid } from './CardsGrid';

export interface PropsType {
  gridCardValue: any;
  savedOrRecommend: string;
  spotsOrPersonsText: string;
  visibilityOrNetwork: string;
}

const PersonaPreviewWrapper = styled.div`
  height: ${(props) => props.theme.contentHeightWithTabs};
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
  visibilityOrNetwork,
}) => {
  return (
    <PersonaPreviewWrapper>
      <InformationUnderText title="">
        <TextInInfo>
          In a {visibilityOrNetwork} tab you can see how many people {savedOrRecommend} your default persona.
        </TextInInfo>
      </InformationUnderText>
      <CardsGrid
        gridCardValue={gridCardValue}
        savedOrRecommend={savedOrRecommend}
        spotsOrPersonsText={spotsOrPersonsText}
      />
    </PersonaPreviewWrapper>
  );
};
