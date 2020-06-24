import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { EntityCard } from 'components/CreateSpotAndPersona/CreateCard/EntityCard';
import { CardType } from 'global/graphqls/schema';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_SPOT, GetCardType, UPDATE_SPOT_CARD } from 'global/graphqls/Spot';
import { APP_ROUTES } from 'global/AppRouter/routes';
import { Spinner } from '../../Spinner/Spinner';

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
  const { data, loading } = useQuery<GetCardType>(GET_SPOT, {
    variables: { uuid },
  });
  const initialValues = data ? data.spot.card : cardInitialValues;
  const [updateCard] = useMutation<GetCardType>(UPDATE_SPOT_CARD);

  if (loading) {
    return <Spinner />;
  }

  if (!uuid) {
    return null;
  }
  if (!data) {
    return null;
  }

  return (
    <EntityCard
      nextPathName={APP_ROUTES.EDIT_SPOT_UUID_STEP_2(uuid)}
      stepperNumbers={[1, 2]}
      currentNumber={1}
      initialValues={initialValues}
      updateCard={updateCard}
    />
  );
};
