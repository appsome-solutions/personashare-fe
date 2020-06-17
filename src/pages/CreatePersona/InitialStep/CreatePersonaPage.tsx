import React, { FC } from 'react';
import { EntityPage } from 'components/CreateSpotAndPersona/CreatePage/EntityPage';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { PageType, Entity } from 'global/graphqls/schema';
import { CREATE_PERSONA, GET_PERSONAS } from 'global/graphqls/Persona';
import { cardDefaults } from 'global/ApolloLinkState/spotAndPersona';
import { GET_CARD, GET_PAGE, GetCardType, GetPageType } from 'global/graphqls/SpotAndPersona';
import { APP_ROUTES } from 'global/AppRouter/routes';
import { GET_USER } from '../../../global/graphqls/User';

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
  const [createPersona] = useMutation<{ createPersona: Entity }>(CREATE_PERSONA, {
    update(cache, { data }) {
      if (!data) {
        return;
      }
      const { createPersona } = data;

      const { user } = cache.readQuery({ query: GET_USER }) as { user: any };

      // First persona Creation
      if (!user.defaultPersona) {
        cache.writeQuery({
          query: GET_USER,
          data: {
            user: {
              ...user,
              photo: createPersona.card.avatar ? createPersona.card.avatar : '',
              defaultPersona: createPersona.uuid,
            },
          },
        });
        cache.writeQuery({
          query: GET_PERSONAS,
          data: { userPersonas: [createPersona] },
        });
      } else {
        const { userPersonas } = cache.readQuery({ query: GET_PERSONAS }) as { userPersonas: any };
        cache.writeQuery({
          query: GET_PERSONAS,
          data: { userPersonas: userPersonas.concat([createPersona]) },
        });
      }
    },
  });
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
      nextStepPath={APP_ROUTES.MY_PERSONAS}
      nameSpotOrPersona="Persona"
      previousStepPath={APP_ROUTES.PERSONA_CREATION_STEP_2}
    />
  );
};
