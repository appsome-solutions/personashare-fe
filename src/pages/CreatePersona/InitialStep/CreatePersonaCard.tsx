import React, { FC } from 'react';
import { EntityCard } from 'components/CreateSpotAndPersona/CreateCard/EntityCard';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_CARD, GetCardType, UPDATE_CARD } from '../../../global/graphqls/SpotAndPersona';
import { CardType } from '../../../global/graphqls/schema';

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
  const [updateCard] = useMutation<GetCardType>(UPDATE_CARD);
  return (
    <EntityCard
      nextPathName="/createpersona/page"
      stepperNumbers={[1, 2, 3]}
      currentNumber={2}
      initialValues={initialValues}
      updateCard={updateCard}
    />
  );
};
