import React, { FC } from 'react';
import { useQuery } from '@apollo/react-hooks';
import isEmpty from 'lodash/isEmpty';
import { Spinner } from 'components/Spinner/Spinner';
import { Overlay } from 'components/Overlay/Overlay';
import { useParams } from 'react-router-dom';
import { GET_SPOT, GetCardType } from 'global/graphqls/Spot';
import { EntityPreview } from 'components/EntityPreview/EntityPreview';

export const MySpotPreview: FC = () => {
  const { uuid } = useParams();
  const { loading, data } = useQuery<GetCardType>(GET_SPOT, {
    variables: { uuid },
  });

  if (loading) {
    return (
      <Overlay>
        <Spinner />
      </Overlay>
    );
  }
  // OR !data is used cause typescript doesn't know that data can no longer be undefined in return method
  if (isEmpty(data?.spot) || !data) {
    return <div>No spots...</div>;
  }

  return <EntityPreview uuidQuery={data.spot.uuid} entityPage={data.spot.page} />;
};
