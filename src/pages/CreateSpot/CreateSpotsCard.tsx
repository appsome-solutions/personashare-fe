import React, { FC } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_CARD, GetCardType, UPDATE_CARD } from 'global/graphqls/SpotAndPersona';
import { CardType } from 'global/graphqls/schema';
import { CreateEntityCard } from 'components/CreateSpotAndPersona/CreateCard/CreateEntityCard';

const cardInitialValues: CardType = {
  name: '',
  description: '',
  avatar: '',
  background: '',
  avatarUpload: null,
  backgroundUpload: null,
};

export const CreateSpotsCard: FC = () => {
  const { data } = useQuery<GetCardType>(GET_CARD);
  const initialValues = data ? data.entity.card : cardInitialValues;
  const [updateCardSpot] = useMutation<GetCardType>(UPDATE_CARD);

  return (
    <CreateEntityCard
      initialValues={initialValues}
      updateCard={updateCardSpot}
      nextPathName="/creation/step/3/entity/spot"
    />
  );
};
