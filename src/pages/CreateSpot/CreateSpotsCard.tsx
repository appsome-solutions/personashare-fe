import React, { FC } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_CARD, GetCardType, UPDATE_CARD } from 'global/graphqls/SpotAndPersona';
import { CardType } from 'global/graphqls/schema';
import { APP_ROUTES } from 'global/AppRouter/routes';
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
      nextPathName={APP_ROUTES.SPOT_CREATION_STEP_3}
    />
  );
};
