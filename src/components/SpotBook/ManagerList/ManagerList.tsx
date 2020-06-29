import React, { FC, useRef } from 'react';
import { Carousel as AntCarousel } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import { AgregatedPersona } from 'global/graphqls/schema';
import { GET_SPOT, GetCardType } from 'global/graphqls/Spot';
import { useHistory, useParams } from 'react-router-dom';
import { APP_ROUTES } from 'global/AppRouter/routes';
import Carousel from 'components/Carousel/Carousel';
import { RecommendButtonPersona } from 'components/RecommendButton/RecommendButtonPersona';
import { SavePersona } from 'components/SaveEntity/SavePersona';
import styled from 'styled-components';
import { PersonaCard } from '../../PersonaCard/PersonaCard';

// todo: refactor it, Recommend button should be part of a Card
const CardWrapper = styled.div`
  && img:nth-child(2) {
    position: absolute;
    top: 165px;
  }
`;

export const ManagerList: FC = () => {
  const carousel = useRef<AntCarousel>(null);
  const { uuid } = useParams();
  const { data } = useQuery<GetCardType>(GET_SPOT, {
    variables: { uuid: uuid },
  });
  const history = useHistory();

  return (
    <Carousel ref={carousel}>
      {data?.spot?.managers?.map((persona: AgregatedPersona) => (
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
  );
};
