import React, { FC } from 'react';
import { EntityPage } from 'components/CreateSpotAndPersona/CreatePage/EntityPage';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_SPOT, GET_SPOTS, UPDATE_SPOT_PAYLOAD } from 'global/graphqls/Spot';
import { Entity, PageType } from 'global/graphqls/schema';
import { cardDefaults } from 'global/ApolloLinkState/spotAndPersona';
import { GET_CARD, GetCardType, GetPageType } from 'global/graphqls/SpotAndPersona';
import { useParams } from 'react-router-dom';
import { APP_ROUTES } from 'global/AppRouter/routes';
import { Spinner } from '../../Spinner/Spinner';
import { useTranslation } from 'react-i18next';

const pageInitialValues: PageType = {
  content: null,
  avatar: '',
  background: '',
  avatarUpload: null,
  backgroundUpload: null,
};

export const EditSpotPage: FC = () => {
  const { uuid } = useParams();
  const { t } = useTranslation();
  const { data, loading } = useQuery(GET_SPOT, { variables: { uuid }, fetchPolicy: 'no-cache' });
  const { data: spotData, loading: spotLoading } = useQuery<GetCardType>(GET_CARD);
  const [updateSpot] = useMutation<{ updateSpot: Entity }>(UPDATE_SPOT_PAYLOAD, {
    update(cache, { data }) {
      if (!data) {
        return;
      }
      const { updateSpot } = data;
      const { userSpots } = cache.readQuery({ query: GET_SPOTS }) as { userSpots: any };
      cache.writeQuery({
        query: GET_SPOTS,
        data: {
          userSpots: userSpots.map((spot: Entity) => {
            if (spot.uuid === updateSpot.uuid) {
              return updateSpot;
            }
            return spot;
          }),
        },
      });
      cache.writeQuery({
        query: GET_SPOT,
        data: {
          spot: updateSpot,
        },
        variables: {
          uuid: updateSpot.uuid,
        },
      });
    },
  });

  const initialValues = data?.spot?.page || pageInitialValues;
  const cardDefaultSpot = cardDefaults;

  if (loading || spotLoading) {
    return <Spinner />;
  }
  if (!spotData) {
    return null;
  }

  if (!uuid) return null;
  return (
    <EntityPage
      titleCard={t('CREATION_STEP_3_SPOT_HEADING')}
      infoBody={t('CREATION_STEP_3_SPOT_INFO')}
      currentNumber={2}
      stepperNumbers={[1, 2]}
      CreateOrSave={t('SPOT_UUID_SAVE_BUTTON')}
      cardDefault={cardDefaultSpot}
      card={spotData.entity.card}
      onPageSubmitCreateOrUpdate={updateSpot}
      initialValues={initialValues}
      nextStepPath={APP_ROUTES.MY_SPOTS}
      previousStepPath={APP_ROUTES.EDIT_SPOT_UUID_STEP_1(uuid)}
      nameSpotOrPersona={t('SPOT_TEXT')}
    />
  );
};
