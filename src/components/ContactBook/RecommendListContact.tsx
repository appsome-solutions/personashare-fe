import Carousel from '../Carousel/Carousel';
import { gqlUser, AgregatedPersona } from 'global/graphqls/schema';
import { PersonaCard } from '../PersonaCard/PersonaCard';
import React, { FC, useRef } from 'react';
import { Carousel as AntCarousel } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import { GET_PERSONA, GetCardType } from 'global/graphqls/Persona';
import { GET_USER } from 'global/graphqls/User';
import styled from 'styled-components';

const RecommendText = styled.div`
  ${props => props.theme.typography.body2}
`;

const MainComponent = styled.div`
  margin-bottom: 20px;
`;
export const RecommendContactBook: FC = () => {
  const carousel = useRef<AntCarousel>(null);
  const { data: userPersona } = useQuery<{ user: gqlUser }>(GET_USER);
  const { data } = useQuery<GetCardType>(GET_PERSONA, {
    variables: { uuid: userPersona?.user?.defaultPersona },
  });

  return (
    <MainComponent>
      <RecommendText>Recommend</RecommendText>
      <Carousel ref={carousel}>
        {data?.persona.recommendList.map((persona: AgregatedPersona) => (
          <PersonaCard card={persona.card} uuid={persona.uuid} />
        ))}
      </Carousel>
    </MainComponent>
  );
};
