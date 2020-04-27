import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { EntityCard } from 'components/CreateSpotAndPersona/CreateCard/EntityCard';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { CardType } from 'global/graphqls/schema';
import { GET_PERSONA_CARD, GetCardType, UPDATE_PERSONA_CARD } from 'global/graphqls/Persona';
import { APP_ROUTES } from '../../../global/AppRouter/routes';

const cardInitialValues: CardType = {
  name: '',
  description: '',
  avatar: '',
  background: '',
  avatarUpload: null,
  backgroundUpload: null,
};

export const EditPersonaCard: FC = () => {
  const { uuid } = useParams();
  const { data } = useQuery<GetCardType>(GET_PERSONA_CARD, {
    variables: { uuid },
  });
  const initialValues = data ? data.persona.card : cardInitialValues;
  const [updateCard] = useMutation<GetCardType>(UPDATE_PERSONA_CARD);

  if (!uuid) return null;

  if (!data) {
    return null;
  }
  return (
    <EntityCard
      nextPathName={APP_ROUTES.EDIT_PERSONA_UUID_STEP_2(uuid)}
      stepperNumbers={[1, 2]}
      currentNumber={1}
      initialValues={initialValues}
      updateCard={updateCard}
    />
  );
};
