import React, { FC } from 'react';
import { CreateEntityPage } from 'components/CreateSpotAndPersona/CreatePage/CreateEntityPage';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { PageType, Entity } from 'global/graphqls/schema';
import { CREATE_PERSONA } from 'global/graphqls/Persona';
import { cardDefaults } from 'global/ApolloLinkState/spotAndPersona';
import { GET_CARD, GET_PAGE, GetCardType, GetPageType } from 'global/graphqls/SpotAndPersona';

const pageInitialValues: PageType = {
  content: null,
  avatar: '',
  background: '',
  avatarUpload: null,
  backgroundUpload: null,
};

export const CreatePersonaPage: FC = () => {
  const { data } = useQuery<GetPageType>(GET_PAGE);
  const { data: personaData } = useQuery<GetCardType>(GET_CARD);
  const [createPersona] = useMutation<Entity>(CREATE_PERSONA);
  const initialValues = data?.entity?.page || pageInitialValues;
  const cardDefaultPersona = cardDefaults;

  if (!personaData) {
    return null;
  }
  return (
    <div>
      <CreateEntityPage
        cardDefault={cardDefaultPersona}
        card={personaData.entity.card}
        createPersonaOrSpot={createPersona}
        initialValues={initialValues}
        nextStepPath="/my-personas"
        nameSpotOrPersona="Persona"
        previousStepPath="/createpersona/card"
      />
    </div>
  );
};
