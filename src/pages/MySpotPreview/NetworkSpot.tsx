import React, { FC } from 'react';
import { APP_ROUTES } from 'global/AppRouter/routes';
import { useQuery } from '@apollo/react-hooks';
import { gqlUser } from 'global/graphqls/schema';
import { GET_USER } from 'global/graphqls/User';
import { Overlay } from 'components/Overlay/Overlay';
import { Spinner } from 'components/Spinner/Spinner';
import { VisibilityOrNetwork } from '../../components/EntityPreview/VisibilityOrNetwork';
import { GET_SPOT, GetCardType } from '../../global/graphqls/Spot';

export const NetworkSpot: FC = () => {
  const { data: userPersona } = useQuery<{ user: gqlUser }>(GET_USER);
  const { data, loading } = useQuery<GetCardType>(GET_SPOT, {
    variables: { uuid: userPersona?.user?.defaultPersona },
  });

  if (!data) return null;

  if (loading) {
    return (
      <Overlay>
        <Spinner />
      </Overlay>
    );
  }
  return (
    <VisibilityOrNetwork
      gridCardValue={data?.spot?.networkList}
      savedOrRecommend="recommend"
      spotsOrPersonsText="spot"
      link={APP_ROUTES.SPOT_PREVIEW}
      visibilityOrNetwork="visibility"
    />
  );
};
