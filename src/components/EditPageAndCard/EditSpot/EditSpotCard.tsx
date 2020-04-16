import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { EntityCard } from 'components/CreateSpotAndPersona/CreateCard/EntityCard';
import { CardType } from '../../../global/graphqls/schema';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_SPOT_CARD, GetCardType, UPDATE_SPOT_CARD } from '../../../global/graphqls/Spot';

const cardInitialValues: CardType = {
  name: '',
  description: '',
  avatar: '',
  background: '',
  avatarUpload: null,
  backgroundUpload: null,
};

export const EditSpotCard: FC = () => {
  const { uuid } = useParams();
  const { data } = useQuery<GetCardType>(GET_SPOT_CARD, {
    variables: { uuid },
  });
  const initialValues = data ? data.spot.card : cardInitialValues;
  const [updateCard] = useMutation<GetCardType>(UPDATE_SPOT_CARD);
  if (!data) {
    return null;
  }
  return (
    <EntityCard
      nextPathName={`/edit/spot/${uuid}/step/2`}
      stepperNumbers={[1, 2]}
      currentNumber={1}
      initialValues={initialValues}
      updateCard={updateCard}
    />
  );
};
