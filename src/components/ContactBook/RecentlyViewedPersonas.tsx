import React, { useRef, useState } from 'react';
import { AgregatedPersona } from '../../global/graphqls/schema';
import { PersonaCard } from '../PersonaCard/PersonaCard';
import { APP_ROUTES } from '../../global/AppRouter/routes';
import { RecommendButtonPersona } from '../RecommendButton/RecommendButtonPersona';
import { SavePersona } from '../SaveEntity/SavePersona';
import Carousel from '../Carousel/Carousel';
import styled from 'styled-components';
import { Carousel as AntCarousel } from 'antd';
import { useHistory } from 'react-router-dom';
import { client } from '../../global/ApolloClient/ApolloClient';
import { GET_PERSONA } from '../../global/graphqls/Persona';
import { Overlay } from '../Overlay/Overlay';
import { Spinner } from '../Spinner/Spinner';
import { useTranslation } from 'react-i18next';

// todo: refactor it, Recommend button should be part of a Card
const CardWrapper = styled.div`
  position: relative;
`;

const StyledRecommendButtonPersona = styled(RecommendButtonPersona)`
  top: 162px;
  right: 12px;
  position: absolute;
`;

const StyledCarousel = styled(Carousel)`
  && {
    .slick-track {
      margin: auto;
    }
  }
`;
// todo: remove it when BE will return personas/spots in a bulk
const useRecentlyViewedPersonas = (recentlyViewedPersonaUuids: Array<string>) => {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<any>(null);

  if (!loading || results) {
    return [loading, results];
  }

  const getPersonasQueries = recentlyViewedPersonaUuids.map((uuid) => {
    return client.query({
      query: GET_PERSONA,
      variables: {
        uuid,
      },
    });
  });

  Promise.all(getPersonasQueries).then((results) => {
    setResults(results.filter((result) => result.data.persona).map((result) => result.data.persona));
    setLoading(false);
  });

  return [loading, results];
};

export const RecentlyViewedPersonas = () => {
  const carousel = useRef<AntCarousel>(null);
  const history = useHistory();
  const { t } = useTranslation();

  const recentlyViewedPersonaUuids = JSON.parse(localStorage.getItem('recentlyViewedPersonas') || '[]');

  const [loading, recentlyViewedPersonas] = useRecentlyViewedPersonas(recentlyViewedPersonaUuids);

  if (loading) {
    return (
      <Overlay>
        <Spinner />
      </Overlay>
    );
  }

  if (!recentlyViewedPersonaUuids.length || loading) {
    return null;
  }

  return (
    <>
      {!!recentlyViewedPersonas.length && <h6>{t('RECENTLY_VIEWED_PERSONA')}</h6>}
      <StyledCarousel ref={carousel}>
        {recentlyViewedPersonas.map((persona: AgregatedPersona) => (
          <CardWrapper key={persona.uuid}>
            <PersonaCard
              card={persona.card}
              uuid={persona.uuid}
              onClick={() =>
                history.push({
                  pathname: `${APP_ROUTES.PERSONA_PREVIEW(persona.uuid)}`,
                })
              }
            />
            <StyledRecommendButtonPersona uuid={persona.uuid} />
            <SavePersona uuid={persona.uuid} />
          </CardWrapper>
        ))}
      </StyledCarousel>
    </>
  );
};
