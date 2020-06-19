import React, { FC } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Overlay } from 'components/Overlay/Overlay';
import { Spinner } from 'components/Spinner/Spinner';
import { VisibilityOrNetwork } from 'components/EntityPreview/VisibilityOrNetwork';
import { GET_SPOT, GetCardType } from 'global/graphqls/Spot';
import { useParams } from 'react-router-dom';

export const VisibilitySpot: FC = () => {
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
      gridCardValue={data?.spot?.visibilityList}
      savedOrRecommend="saved"
      spotsOrPersonsText="persona"
      visibilityOrNetwork="visibility"
    />
  );
};
