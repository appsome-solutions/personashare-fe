import React, { useRef, useState } from 'react';
import { AgregatedSpot } from '../../global/graphqls/schema';
import { PersonaCard } from '../PersonaCard/PersonaCard';
import { APP_ROUTES } from '../../global/AppRouter/routes';
import Carousel from '../Carousel/Carousel';
import styled from 'styled-components';
import { Carousel as AntCarousel } from 'antd';
import { useHistory } from 'react-router-dom';
import { client } from '../../global/ApolloClient/ApolloClient';
import { GET_SPOT } from '../../global/graphqls/Spot';
import { RecommendButtonSpot } from 'components/RecommendButton/RecommendButtonSpot';
import { SaveSpotButton } from '../SaveEntity/SaveSpot';
import { Overlay } from '../Overlay/Overlay';
import { Spinner } from '../Spinner/Spinner';
import { useTranslation } from 'react-i18next';

// todo: refactor it, Recommend button should be part of a Card
const CardWrapper = styled.div`
  position: relative;
`;

// todo: remove it when BE will return personas/spots in a bulk
const useRecentlyViewedSpots = (recentlyViewedSpotUuids: Array<string>) => {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<any>(null);

  if (!loading || results) {
    return [loading, results];
  }

  const getsSpotQueries = recentlyViewedSpotUuids.map((uuid) => {
    return client.query({
      query: GET_SPOT,
      variables: {
        uuid,
      },
    });
  });

  Promise.all(getsSpotQueries).then((results) => {
    setResults(results.filter((result) => result.data.spot).map((result) => result.data.spot));
    setLoading(false);
  });

  return [loading, results];
};

const StyledRecommendButtonSpot = styled(RecommendButtonSpot)`
  top: 162px;
  right: 12px;
  position: absolute;
`;

export const RecentlyViewedSpots = () => {
  const carousel = useRef<AntCarousel>(null);
  const history = useHistory();
  const { t } = useTranslation();

  const recentlyViewedSpotUuids = JSON.parse(localStorage.getItem('recentlyViewedSpots') || '[]');

  const [loading, recentlyViewedSpots] = useRecentlyViewedSpots(recentlyViewedSpotUuids);

  if (loading) {
    return (
      <Overlay>
        <Spinner />
      </Overlay>
    );
  }

  if (!recentlyViewedSpotUuids.length || loading) {
    return null;
  }

  return (
    <>
      {!!recentlyViewedSpots.length && <h6>{t('RECENTLY_VIEWED_SPOT')}</h6>}
      <Carousel ref={carousel}>
        {recentlyViewedSpots.map((spot: AgregatedSpot) => (
          <CardWrapper key={spot.uuid}>
            <PersonaCard
              card={spot.card}
              uuid={spot.uuid}
              onClick={() =>
                history.push({
                  pathname: `${APP_ROUTES.SPOT_PREVIEW(spot.uuid)}`,
                })
              }
            />
            <StyledRecommendButtonSpot uuid={spot.uuid} canBeRecommended={spot.canBeRecommended} />
            <SaveSpotButton uuid={spot.uuid} />
          </CardWrapper>
        ))}
      </Carousel>
    </>
  );
};
