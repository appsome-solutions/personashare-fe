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
  entity: AgregatedPersona;
  className?: string;
};

export const RecommendContactBook: FC<RecommendContactBookType> = ({ entity, className }) => {
  const carousel = useRef<AntCarousel>(null);

  const allRecommendation = [...entity.recommendList, ...entity.spotRecommendList];

  return (
    <MainComponent className={className}>
      {!!allRecommendation.length && <RecommendText>Recommend</RecommendText>}
      <Carousel ref={carousel}>
        {allRecommendation.map((persona) => (
          <PersonaCard card={persona.card} uuid={persona.uuid} key={persona.uuid} />
        ))}
      </Carousel>
    </MainComponent>
  );
};
