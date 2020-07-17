import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { EntityCard } from 'components/CreateSpotAndPersona/CreateCard/EntityCard';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { CardType } from 'global/graphqls/schema';
import { GET_PERSONA, GetCardType, UPDATE_PERSONA_CARD } from 'global/graphqls/Persona';
import { APP_ROUTES } from 'global/AppRouter/routes';
import { Spinner } from 'components/Spinner/Spinner';
import { useTranslation } from 'react-i18next';

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
  const { data, loading: getCardLoading } = useQuery<GetCardType>(GET_PERSONA, {
    variables: { uuid },
  });
  const [updateCard, { loading: updateCardLoading }] = useMutation<GetCardType>(UPDATE_PERSONA_CARD);
  const { t } = useTranslation();

  if (getCardLoading || updateCardLoading) {
    return <Spinner />;
  }

  if (!uuid) return null;

  if (!data) {
    return null;
  }

  const initialValues = data.persona.card || cardInitialValues;

  return (
    <EntityCard
      infoBody={t('CREATION_STEP_2_INFO')}
      titleCard={t('CREATION_STEP_2_HEADING')}
      nextPathName={APP_ROUTES.EDIT_PERSONA_UUID_STEP_2(uuid)}
      stepperNumbers={[1, 2]}
      currentNumber={1}
      initialValues={initialValues}
      updateCard={updateCard}
    />
  );
};
