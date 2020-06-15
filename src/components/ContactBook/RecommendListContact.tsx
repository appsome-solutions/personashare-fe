import Carousel from 'components/Carousel/Carousel';
import { AgregatedPersona } from 'global/graphqls/schema';
import { PersonaCard } from 'components/PersonaCard/PersonaCard';
import React, { FC, useRef } from 'react';
import { Carousel as AntCarousel } from 'antd';
import styled from 'styled-components';

const RecommendText = styled.div`
  ${(props) => props.theme.typography.body2}
`;

const MainComponent = styled.div`
  margin-bottom: 20px;
`;

type RecommendContactBookType = {
  persona: AgregatedPersona;
};

export const RecommendContactBook: FC<RecommendContactBookType> = ({ persona }) => {
  const carousel = useRef<AntCarousel>(null);

  return (
    <MainComponent>
      {!!persona.recommendList.length && <RecommendText>Recommend</RecommendText>}
      <Carousel ref={carousel}>
        {persona.recommendList.map((persona: AgregatedPersona) => (
          <PersonaCard card={persona.card} uuid={persona.uuid} key={persona.uuid} />
        ))}
      </Carousel>
    </MainComponent>
  );
};
