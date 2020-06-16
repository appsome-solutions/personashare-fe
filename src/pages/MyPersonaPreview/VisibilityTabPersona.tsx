import React, { FC } from 'react';
import { TopNav } from 'components/TopNav/TopNav';
import { StatsNavigationPersona } from 'components/Statistics/StatsNavigationPersona';
import styled from 'styled-components';
import { InfoCard } from 'components/InfoCard/InfoCard';
import { useQuery } from '@apollo/react-hooks';
import { gqlUser } from 'global/graphqls/schema';
import { GET_USER } from 'global/graphqls/User';
import { GET_PERSONA, GetCardType } from 'global/graphqls/Persona';
import { GridCard } from 'components/EntityPreview/GridCard';
import { APP_ROUTES } from 'global/AppRouter/routes';

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

export const VisibilityTabPersona: FC = () => {
  const { data: userPersona } = useQuery<{ user: gqlUser }>(GET_USER);
  const { data } = useQuery<GetCardType>(GET_PERSONA, {
    variables: { uuid: userPersona?.user?.defaultPersona },
  });

  return (
    <>
      <TopNav isWithBackArrow />
      <StatsNavigationPersona />
      <PersonaPreviewWrapper>
        <InformationUnderText title="">
          <TextInInfo>In a visibility tab you can see how many people saved your default persona.</TextInInfo>
        </InformationUnderText>
        <GridCard
          gridCardValue={data?.persona.visibilityList}
          savedOrRecommend="saved"
          spotsOrPersonsText="persona"
          link={APP_ROUTES.PERSONA_PREVIEW}
        />
      </PersonaPreviewWrapper>
    </>
  );
};
