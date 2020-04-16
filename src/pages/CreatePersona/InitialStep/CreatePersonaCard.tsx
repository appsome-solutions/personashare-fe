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

export const CreatePersonaCard: FC = () => {
  const { data } = useQuery<GetCardType>(GET_CARD);
  const initialValues = data ? data.entity.card : cardInitialValues;
  const [updateCardPersona] = useMutation<GetCardType>(UPDATE_CARD);

  return (
    <CreateEntityCard
      updateCard={updateCardPersona}
      initialValues={initialValues}
      nextPathName={APP_ROUTES.PERSONA_CREATION_STEP_3}
    />
  );
};
