import React, { FC } from 'react';
import { EntityPage } from 'components/CreateSpotAndPersona/CreatePage/EntityPage';
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
    <EntityPage
      currentNumber={3}
      stepperNumbers={[1, 2, 3]}
      onPageSubmitCreateOrUpdate={createPersona}
      CreateOrSave="Create"
      cardDefault={cardDefaultPersona}
      card={personaData.entity.card}
      initialValues={initialValues}
      nextStepPath="/my-personas"
      nameSpotOrPersona="Persona"
      previousStepPath="/creation/step/2/entity/persona"
    />
  );
};
