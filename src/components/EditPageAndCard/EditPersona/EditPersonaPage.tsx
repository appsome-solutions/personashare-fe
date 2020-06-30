import React, { FC } from 'react';
import { EntityPage } from 'components/CreateSpotAndPersona/CreatePage/EntityPage';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Entity, PageType } from 'global/graphqls/schema';
import { cardDefaults } from 'global/ApolloLinkState/spotAndPersona';
import { GET_CARD, GetCardType } from 'global/graphqls/SpotAndPersona';
import { GET_PERSONA, UPDATE_PERSONA, GET_PERSONAS } from 'global/graphqls/Persona';
import { useParams } from 'react-router-dom';
import { APP_ROUTES } from 'global/AppRouter/routes';
import { Spinner } from 'components/Spinner/Spinner';
import { useTranslation } from 'react-i18next';

const pageInitialValues: PageType = {
  content: null,
  avatar: '',
  background: '',
  avatarUpload: null,
  backgroundUpload: null,
};

export const EditPersonaPage: FC = () => {
  const { uuid } = useParams();
  const { t } = useTranslation();
  const { data, loading } = useQuery(GET_PERSONA, { variables: { uuid }, fetchPolicy: 'no-cache' });
  const { data: spotData, loading: spotLoading } = useQuery<GetCardType>(GET_CARD);
  const [updatePersona] = useMutation<{ updatePersona: Entity }>(UPDATE_PERSONA, {
    update(cache, { data }) {
      if (!data) {
        return;
      }
      const { updatePersona } = data;
      const { userPersonas } = cache.readQuery({ query: GET_PERSONAS }) as { userPersonas: any };
      cache.writeQuery({
        query: GET_PERSONAS,
        data: {
          userPersonas: userPersonas.map((persona: Entity) => {
            if (persona.uuid === updatePersona.uuid) {
              return updatePersona;
            }
            return persona;
          }),
        },
      });
      cache.writeQuery({
        query: GET_PERSONA,
        data: {
          persona: updatePersona,
        },
        variables: {
          uuid: updatePersona.uuid,
        },
      });
    },
  });
  const cardDefaultSpot = cardDefaults;
  if (loading || spotLoading) {
    return <Spinner />;
  }
  if (!spotData) {
    return null;
  }
  if (!uuid) return null;

  const initialValues = data?.persona?.page || pageInitialValues;

  return (
    <EntityPage
      titleCard={t('CREATION_STEP_3_HEADING')}
      infoBody={t('CREATION_STEP_3_INFO')}
      currentNumber={2}
      stepperNumbers={[1, 2]}
      CreateOrSave={t('SPOT_UUID_SAVE_BUTTON')}
      cardDefault={cardDefaultSpot}
      card={spotData.entity.card}
      onPageSubmitCreateOrUpdate={updatePersona}
      initialValues={initialValues}
      fileList={data.persona?.page?.fileList}
      nextStepPath={APP_ROUTES.MY_PERSONAS}
      nameSpotOrPersona={t('CREATION_STEP_3_CREATE_PERSONA')}
      previousStepPath={APP_ROUTES.EDIT_PERSONA_UUID_STEP_2(uuid)}
    />
  );
};
