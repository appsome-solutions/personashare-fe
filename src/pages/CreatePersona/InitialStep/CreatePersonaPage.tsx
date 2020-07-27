import React, { FC } from 'react';
import { EntityPage } from 'components/CreateSpotAndPersona/CreatePage/EntityPage';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { PageType, Entity } from 'global/graphqls/schema';
import { CREATE_PERSONA, GET_PERSONAS } from 'global/graphqls/Persona';
import { cardDefaults } from 'global/ApolloLinkState/spotAndPersona';
import { GET_CARD, GET_PAGE, GetCardType, GetPageType } from 'global/graphqls/SpotAndPersona';
import { APP_ROUTES } from 'global/AppRouter/routes';
import { GET_USER } from 'global/graphqls/User';
import { useTranslation } from 'react-i18next';
import { Spinner } from 'components/Spinner/Spinner';

const pageInitialValues: PageType = {
  content: null,
  avatar: '',
  background: '',
  avatarUpload: null,
  backgroundUpload: null,
};

export const CreatePersonaPage: FC = () => {
  const { data } = useQuery<GetPageType>(GET_PAGE);
  const { t } = useTranslation();
  const { data: personaData, loading: personaLoading } = useQuery<GetCardType>(GET_CARD);
  const [createPersona, { loading: createPersonaLoading }] = useMutation<{ createPersona: Entity }>(CREATE_PERSONA, {
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

  if (personaLoading || createPersonaLoading) {
    return <Spinner />;
  }

  const initialValues = personaData?.entity?.card || pageInitialValues;
  const cardDefaultPersona = cardDefaults;

  if (!personaData) {
    return null;
  }

  return (
    <EntityPage
      titleCard={t('CREATION_STEP_3_HEADING')}
      infoBody={t('CREATION_STEP_3_INFO')}
      currentNumber={3}
      stepperNumbers={[1, 2, 3]}
      onPageSubmitCreateOrUpdate={createPersona}
      CreateOrSave={t('CREATION_STEP_3_CREATE_BUTTON')}
      cardDefault={cardDefaultPersona}
      card={personaData.entity.card}
      initialValues={initialValues}
      nextStepPath={APP_ROUTES.MY_PERSONAS}
      nameSpotOrPersona={t('CREATION_STEP_3_CREATE_PERSONA')}
      previousStepPath={APP_ROUTES.PERSONA_CREATION_STEP_2}
    />
  );
};
