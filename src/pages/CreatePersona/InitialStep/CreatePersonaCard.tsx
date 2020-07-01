import React, { FC } from 'react';
import { EntityCard } from 'components/CreateSpotAndPersona/CreateCard/EntityCard';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_CARD, GetCardType, UPDATE_CARD } from 'global/graphqls/SpotAndPersona';
import { CardType } from 'global/graphqls/schema';
import { APP_ROUTES } from 'global/AppRouter/routes';
import { useTranslation } from 'react-i18next';

const cardInitialValues: CardType = {
  name: '',
  description: '',
  avatar: '',
  background: '',
  avatarUpload: null,
  backgroundUpload: null,
};

export const CreatePersonaCard: FC = () => {
  const { data, loading } = useQuery<GetCardType>(GET_CARD);
  const [updateCard] = useMutation<GetCardType>(UPDATE_CARD);
  const { t } = useTranslation();

  if (loading) {
    return null;
  }

  const initialValues = data ? data.entity.card : cardInitialValues;
  return (
    <EntityCard
      infoBody={t('CREATION_STEP_2_INFO')}
      titleCard={t('CREATION_STEP_2_HEADING')}
      nextPathName={APP_ROUTES.PERSONA_CREATION_STEP_3}
      stepperNumbers={[1, 2, 3]}
      currentNumber={2}
      initialValues={initialValues}
      updateCard={updateCard}
    />
  );
};
