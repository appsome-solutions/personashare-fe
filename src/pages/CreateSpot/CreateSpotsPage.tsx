import React, { FC } from 'react';
import { CreateEntityPage } from 'components/CreateSpotAndPersona/CreatePage/CreateEntityPage';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { CREATE_SPOT } from 'global/graphqls/Spot';
import { PageType, Entity } from 'global/graphqls/schema';
import { cardDefaults } from 'global/ApolloLinkState/spotAndPersona';
import { GET_CARD, GET_PAGE, GetCardType, GetPageType } from 'global/graphqls/SpotAndPersona';

const pageInitialValues: PageType = {
  content: null,
  avatar: '',
  background: '',
  avatarUpload: null,
  backgroundUpload: null,
};

export const CreateSpotsPage: FC = () => {
  const { data } = useQuery<GetPageType>(GET_PAGE);
  const { data: spotData } = useQuery<GetCardType>(GET_CARD);
  const [createSpot] = useMutation<Entity>(CREATE_SPOT);
  const initialValues = data?.entity?.page || pageInitialValues;
  const cardDefaultSpot = cardDefaults;

  if (!spotData) {
    return null;
  }

  return (
    <CreateEntityPage
      cardDefault={cardDefaultSpot}
      card={spotData.entity.card}
      createPersonaOrSpot={createSpot}
      initialValues={initialValues}
      nextStepPath="/my-spots"
      nameSpotOrPersona="Spot"
      previousStepPath="/creation/step/2/entity/spot"
    />
  );
};
