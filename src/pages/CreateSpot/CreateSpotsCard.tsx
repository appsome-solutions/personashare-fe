import React, { FC } from 'react';
import { EntityCard } from 'components/CreateSpotAndPersona/CreateCard/EntityCard';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_CARD, GetCardType, UPDATE_CARD } from 'global/graphqls/SpotAndPersona';
import { CardType } from 'global/graphqls/schema';
import { APP_ROUTES } from 'global/AppRouter/routes';
import { useTranslation } from 'react-i18next';
import { Spinner } from 'components/Spinner/Spinner';

const cardInitialValues: CardType = {
  name: '',
  description: '',
  avatar: '',
  background: '',
  avatarUpload: null,
  backgroundUpload: null,
};

export const CreateSpotsCard: FC = () => {
  const { data, loading: cardLoading } = useQuery<GetCardType>(GET_CARD);
  const initialValues = data ? data.entity.card : cardInitialValues;
  const [updateCard, { loading: updateCardLoading }] = useMutation<GetCardType>(UPDATE_CARD);
  const { t } = useTranslation();

  if (cardLoading || updateCardLoading) {
    return <Spinner />;
  }

  return (
    <EntityCard
      infoBody={t('CREATION_STEP_2_SPOT_INFO')}
      titleCard={t('CREATION_STEP_2_SPOT_HEADING')}
      nextPathName={APP_ROUTES.SPOT_CREATION_STEP_3}
      stepperNumbers={[1, 2, 3]}
      currentNumber={2}
      initialValues={initialValues}
      updateCard={updateCard}
    />
  );
};
