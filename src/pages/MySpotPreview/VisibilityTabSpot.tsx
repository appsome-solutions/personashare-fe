import React, { FC } from 'react';
import styled from 'styled-components';
import { InfoCard } from 'components/InfoCard/InfoCard';
import { CheckEntity } from 'components/EntityPreview/CheckEntity';
import { TopNav } from 'components/TopNav/TopNav';
import { StatsNavigationSpot } from 'components/Statistics/StatsNavigationSpot';
import { useQuery } from '@apollo/react-hooks';
import { gqlUser } from 'global/graphqls/schema';
import { GET_USER } from 'global/graphqls/User';
import { GET_SPOT, GetCardType } from 'global/graphqls/Spot';
import { APP_ROUTES } from 'global/AppRouter/routes';

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
          <TextInInfo>In a visibility tab you can see how many people saved your spot.</TextInInfo>
        </InformationUnderText>
        <CheckEntity
          visibilityOrNetworkQuery={data?.spot?.networkList}
          savedOrRecommend="saved"
          spotsOrPersonsText="spot"
          link={APP_ROUTES.SPOT_PREVIEW}
        />
      </PersonaPreviewWrapper>
    </>
  );
};
