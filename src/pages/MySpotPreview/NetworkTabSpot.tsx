import React, { FC } from 'react';
import styled from 'styled-components';
import { InfoCard } from 'components/InfoCard/InfoCard';
import { TopNav } from 'components/TopNav/TopNav';
import { StatsNavigationSpot } from 'components/Statistics/StatsNavigationSpot';
import { GridCard } from 'components/EntityPreview/GridCard';
import { useQuery } from '@apollo/react-hooks';
import { gqlUser } from 'global/graphqls/schema';
import { GET_USER } from 'global/graphqls/User';
import { GET_SPOT, GetCardType } from 'global/graphqls/Spot';
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

export const NetworkTabSpot: FC = () => {
  const { data: userPersona } = useQuery<{ user: gqlUser }>(GET_USER);
  const { data } = useQuery<GetCardType>(GET_SPOT, {
    variables: { uuid: userPersona?.user?.defaultPersona },
  });

  return (
    <>
      <TopNav isWithBackArrow />
      <StatsNavigationSpot />
      <PersonaPreviewWrapper>
        <InformationUnderText title="">
          <TextInInfo>In a network tab you can see how many people recommend your spot.</TextInInfo>
        </InformationUnderText>
        <GridCard
          gridCardValue={data?.spot?.networkList}
          savedOrRecommend="recommend"
          spotsOrPersonsText="spot"
          link={APP_ROUTES.SPOT_PREVIEW}
        />
      </PersonaPreviewWrapper>
    </>
  );
};
