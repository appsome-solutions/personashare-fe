import React, { FC } from 'react';
import { EntityPage } from 'components/CreateSpotAndPersona/CreatePage/EntityPage';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Entity, PageType } from 'global/graphqls/schema';
import { cardDefaults } from 'global/ApolloLinkState/spotAndPersona';
import { GET_CARD, GET_PAGE, GetCardType, GetPageType } from 'global/graphqls/SpotAndPersona';
import { GET_PERSONAS, UPDATE_PERSONA } from 'global/graphqls/Persona';
import { useParams } from 'react-router-dom';
import { APP_ROUTES } from 'global/AppRouter/routes';

const pageInitialValues: PageType = {
  content: null,
  avatar: '',
  background: '',
  avatarUpload: null,
  backgroundUpload: null,
};

export const EditPersonaPage: FC = () => {
  const { data } = useQuery<GetPageType>(GET_PAGE);
  const { data: spotData } = useQuery<GetCardType>(GET_CARD);
  const [updatePersona] = useMutation<{ updatePersona: Entity }>(UPDATE_PERSONA, {
    update(cache, { data }) {
      if (!data) {
        return;
      }
      const { updatePersona } = data;
      const { userPersonas } = cache.readQuery({ query: GET_PERSONAS }) as { userPersonas: any };
      cache.writeQuery({
        query: GET_PERSONAS,
        data: { userPersonas: userPersonas.concat([updatePersona]) },
      });
    },
  });
  const initialValues = data?.entity?.page || pageInitialValues;
  const cardDefaultSpot = cardDefaults;
  const { uuid } = useParams();

  if (!spotData) {
    return null;
  }
  if (!uuid) return null;
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
