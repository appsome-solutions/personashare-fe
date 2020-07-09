import React, { FC } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Spinner } from 'components/Spinner/Spinner';
import { Overlay } from 'components/Overlay/Overlay';
import { useParams } from 'react-router-dom';
import { GET_SPOT, GetCardType } from 'global/graphqls/Spot';
import { CardsGrid } from 'components/EntityPreview/CardsGrid';

export const ParticipantList: FC = () => {
  const { uuid } = useParams();
  const { loading, data } = useQuery<GetCardType>(GET_SPOT, {
    variables: { uuid },
    skip: !uuid,
  });

  if (loading) {
    return (
      <Overlay>
        <Spinner />
      </Overlay>
    );
  }
  // OR !data is used cause typescript doesn't know that data can no longer be undefined in return method
  /*if (isEmpty(data?.spot) || !data) {
    return <div>No Participants...</div>;
  }*/

  const canPersonaParticipate = () => {
    // this is during spot creation
    if (!data) {
      return true;
    }
    return data?.spot?.canPersonaParticipate;
  };

  return (
    <CardsGrid
      isWithAddParticipate={true}
      isWithText={false}
      gridCardValue={data?.spot?.participants}
      canPersonaParticipate={canPersonaParticipate()}
    />
  );
};
