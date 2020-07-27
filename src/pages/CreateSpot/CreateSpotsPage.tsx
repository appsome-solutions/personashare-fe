import React, { FC } from 'react';
import { EntityPage } from 'components/CreateSpotAndPersona/CreatePage/EntityPage';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { CREATE_SPOT, GET_SPOTS } from 'global/graphqls/Spot';
import { PageType, Entity } from 'global/graphqls/schema';
import { cardDefaults } from 'global/ApolloLinkState/spotAndPersona';
import { GET_CARD, GET_PAGE, GetCardType, GetPageType } from 'global/graphqls/SpotAndPersona';
import { APP_ROUTES } from 'global/AppRouter/routes';
import { useTranslation } from 'react-i18next';
import { Spinner } from 'components/Spinner/Spinner';

const pageInitialValues: PageType = {
  content: null,
  avatar: '',
  background: '',
  avatarUpload: null,
  backgroundUpload: null,
};

export const CreateSpotsPage: FC = () => {
  const { data } = useQuery<GetPageType>(GET_PAGE);
  const { t } = useTranslation();
  const { data: spotData, loading: spotLoading } = useQuery<GetCardType>(GET_CARD);
  const [createSpot, { loading: createSpotLoading }] = useMutation<{ createSpot: Entity }>(CREATE_SPOT, {
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
  const initialValues = spotData?.entity?.card || pageInitialValues;
  const cardDefaultSpot = cardDefaults;

  if (spotLoading || createSpotLoading) {
    return <Spinner />;
  }

  if (!spotData) {
    return null;
  }

  return (
    <div>
      <EntityPage
        titleCard={t('CREATION_STEP_3_SPOT_HEADING')}
        infoBody={t('CREATION_STEP_3_SPOT_INFO')}
        currentNumber={3}
        stepperNumbers={[1, 2, 3]}
        CreateOrSave={t('CREATION_STEP_3_CREATE_BUTTON')}
        cardDefault={cardDefaultSpot}
        card={spotData.entity.card}
        onPageSubmitCreateOrUpdate={createSpot}
        initialValues={initialValues}
        nextStepPath={APP_ROUTES.MY_SPOTS}
        nameSpotOrPersona={t('SPOT_TEXT')}
        previousStepPath={APP_ROUTES.SPOT_CREATION_STEP_2}
      />
    </div>
  );
};
