import React, { FC } from 'react';
import { EntityPage } from 'components/CreateSpotAndPersona/CreatePage/EntityPage';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_SPOTS, UPDATE_SPOT } from 'global/graphqls/Spot';
import { Entity, PageType } from 'global/graphqls/schema';
import { cardDefaults } from 'global/ApolloLinkState/spotAndPersona';
import { GET_CARD, GET_PAGE, GetCardType, GetPageType } from 'global/graphqls/SpotAndPersona';
import { useParams } from 'react-router-dom';
import { APP_ROUTES } from 'global/AppRouter/routes';
import { GET_PERSONAS } from '../../../global/graphqls/Persona';

const pageInitialValues: PageType = {
  content: null,
  avatar: '',
  background: '',
  avatarUpload: null,
  backgroundUpload: null,
};

export const EditSpotPage: FC = () => {
  const { data } = useQuery<GetPageType>(GET_PAGE);
  const { data: spotData } = useQuery<GetCardType>(GET_CARD);
  const [updateSpot] = useMutation<{ updateSpot: Entity }>(UPDATE_SPOT, {
    update(cache, { data }) {
      if (!data) {
        return;
      }
      const { updateSpot } = data;
      const { userSpots } = cache.readQuery({ query: GET_SPOTS }) as { userSpots: any };
      cache.writeQuery({
        query: GET_PERSONAS,
        data: { userPersonas: userSpots.concat([updateSpot]) },
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
      onPageSubmitCreateOrUpdate={updateSpot}
      initialValues={initialValues}
      nextStepPath={APP_ROUTES.MY_SPOTS}
      nameSpotOrPersona="Spot"
      previousStepPath={APP_ROUTES.EDIT_SPOT_UUID_STEP_2(uuid)}
    />
  );
};
