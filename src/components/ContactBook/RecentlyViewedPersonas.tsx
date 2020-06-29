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

// todo: refactor it, Recommend button should be part of a Card
const CardWrapper = styled.div`
  position: relative;

  && img:nth-child(2) {
    position: absolute;
    top: 165px;
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
    setResults(results.map((result) => result.data.persona));
    setLoading(false);
  });

  return [loading, results];
};

export const RecentlyViewedPersonas = () => {
  const carousel = useRef<AntCarousel>(null);
  const history = useHistory();

  const recentlyViewedPersonaUuids = JSON.parse(localStorage.getItem('recentlyViewedPersonas') || '[]');

  const [loading, recentlyViewedPersonas] = useRecentlyViewedPersonas(recentlyViewedPersonaUuids);

  if (!recentlyViewedPersonaUuids.length || loading) {
    return null;
  }

  return (
    <>
      <h6> Recently viewed personas </h6>
      <Carousel ref={carousel}>
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
            <RecommendButtonPersona uuid={persona.uuid} />
            <SavePersona uuid={persona.uuid} />
          </CardWrapper>
        ))}
      </Carousel>
    </>
  );
};
