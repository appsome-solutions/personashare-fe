import React, { FC } from 'react';
import { EntityPage } from 'components/CreateSpotAndPersona/CreatePage/EntityPage';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Entity, PageType } from 'global/graphqls/schema';
import { cardDefaults } from 'global/ApolloLinkState/spotAndPersona';
import { GET_CARD, GET_PAGE, GetCardType, GetPageType } from 'global/graphqls/SpotAndPersona';
import { GET_PERSONA, GetPersonaType, UPDATE_PERSONA } from 'global/graphqls/Persona';
import { useParams } from 'react-router-dom';
import { APP_ROUTES } from 'global/AppRouter/routes';
import { Spinner } from 'components/Spinner/Spinner';

const pageInitialValues: PageType = {
  content: null,
  avatar: '',
  background: '',
  avatarUpload: null,
  backgroundUpload: null,
};

export const EditPersonaPage: FC = () => {
  const { uuid } = useParams();
  const { data, loading } = useQuery(GET_PERSONA, { variables: { uuid }, fetchPolicy: 'no-cache' });
  const { data: spotData, loading: spotLoading } = useQuery<GetCardType>(GET_CARD);
  const [updatePersona] = useMutation<Entity>(UPDATE_PERSONA);
  const cardDefaultSpot = cardDefaults;
  if (loading || spotLoading) {
    return <Spinner />;
  }
  if (!spotData) {
    return null;
  }
  if (!uuid) return null;
  const initialValues = data?.persona?.page || pageInitialValues;
  initialValues.content = JSON.parse(initialValues?.content);
  return (
    <EntityPage
      currentNumber={2}
      stepperNumbers={[1, 2]}
      CreateOrSave="Save"
      cardDefault={cardDefaultSpot}
      card={spotData.entity.card}
      onPageSubmitCreateOrUpdate={updatePersona}
      initialValues={initialValues}
      nextStepPath={APP_ROUTES.MY_PERSONAS}
      nameSpotOrPersona="Persona"
      previousStepPath={APP_ROUTES.EDIT_PERSONA_UUID_STEP_2(uuid)}
    />
  );
};
