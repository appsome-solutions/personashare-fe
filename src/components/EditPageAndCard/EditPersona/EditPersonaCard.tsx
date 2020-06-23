import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { EntityCard } from 'components/CreateSpotAndPersona/CreateCard/EntityCard';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { CardType } from 'global/graphqls/schema';
import { GET_PERSONA, GetCardType, UPDATE_PERSONA_CARD } from 'global/graphqls/Persona';
import { APP_ROUTES } from 'global/AppRouter/routes';
import { Spinner } from 'components/Spinner/Spinner';

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
  const { data, loading } = useQuery<GetCardType>(GET_PERSONA, {
    variables: { uuid },
  });
  const [updateCard] = useMutation<GetCardType>(UPDATE_PERSONA_CARD);

  if (loading) {
    return <Spinner />;
  }

  if (!uuid) return null;

  if (!data) {
    return null;
  }

  const initialValues = data.persona.card || cardInitialValues;

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
