import React, { FC } from 'react';
import styled from 'styled-components';
import { InfoCard } from 'components/InfoCard/InfoCard';
import { CardsGrid } from './CardsGrid';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  return (
    <PersonaPreviewWrapper>
      <InformationUnderText title="">
        <TextInInfo>
          {t('MY_PERSONA_UUID_ENTITY_TAB')} {visibilityOrNetwork} {t('MY_PERSONA_UUID_ENTITY_TAB_2')} {savedOrRecommend}
        </TextInInfo>
      </InformationUnderText>
      {gridCardValue.length !== 0 && (
        <CardsGrid
          gridCardValue={gridCardValue}
          savedOrRecommend={savedOrRecommend}
          spotsOrPersonsText={spotsOrPersonsText}
        />
      )}
    </PersonaPreviewWrapper>
  );
};
