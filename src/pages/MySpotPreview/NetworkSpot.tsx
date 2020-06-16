import React, { FC } from 'react';
import { APP_ROUTES } from 'global/AppRouter/routes';
import { useQuery } from '@apollo/react-hooks';
import { Overlay } from 'components/Overlay/Overlay';
import { Spinner } from 'components/Spinner/Spinner';
import { VisibilityOrNetwork } from '../../components/EntityPreview/VisibilityOrNetwork';
import { GET_SPOT, GetCardType } from '../../global/graphqls/Spot';
import { useParams } from 'react-router-dom';

export const NetworkSpot: FC = () => {
  const { uuid } = useParams();
  const { data, loading } = useQuery<GetCardType>(GET_SPOT, {
    variables: { uuid },
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
