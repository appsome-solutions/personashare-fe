import React, { FC } from 'react';
import { EntityPage } from 'components/CreateSpotAndPersona/CreatePage/EntityPage';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { CREATE_SPOT, GET_SPOTS } from 'global/graphqls/Spot';
import { PageType, Entity } from 'global/graphqls/schema';
import { cardDefaults } from 'global/ApolloLinkState/spotAndPersona';
import { GET_CARD, GET_PAGE, GetCardType, GetPageType } from 'global/graphqls/SpotAndPersona';
import { APP_ROUTES } from 'global/AppRouter/routes';

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
  const [createSpot] = useMutation<{ createSpot: Entity }>(CREATE_SPOT, {
    update(cache, { data }) {
      if (!data) {
        return;
      }
      const { createSpot } = data;
      const { userSpots } = cache.readQuery({ query: GET_SPOTS }) as { userSpots: any };
      cache.writeQuery({
        query: GET_SPOTS,
        data: { userSpots: userSpots.concat([createSpot]) },
      });
    },
  });
  const initialValues = data?.entity?.page || pageInitialValues;
  const cardDefaultSpot = cardDefaults;

  if (!spotData) {
    return null;
  }

  return (
    <div>
      <EntityPage
        currentNumber={3}
        stepperNumbers={[1, 2, 3]}
        CreateOrSave="Create"
        cardDefault={cardDefaultSpot}
        card={spotData.entity.card}
        onPageSubmitCreateOrUpdate={createSpot}
        initialValues={initialValues}
        nextStepPath={APP_ROUTES.MY_SPOTS}
        nameSpotOrPersona="Spot"
        previousStepPath={APP_ROUTES.SPOT_CREATION_STEP_2}
      />
    </div>
  );
};
