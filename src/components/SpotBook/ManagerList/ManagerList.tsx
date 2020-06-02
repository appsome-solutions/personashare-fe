import React, { FC, useRef } from 'react';
import { Carousel as AntCarousel } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import { AgregatedPersona } from 'global/graphqls/schema';
import { SpotPage } from '../../SpotPage/SpotPage';
import { GET_SPOT, GetCardType } from '../../../global/graphqls/Spot';
import { useHistory, useParams } from 'react-router-dom';
import { APP_ROUTES } from '../../../global/AppRouter/routes';
import Carousel from '../../Carousel/Carousel';
import { RecommendButtonPersona } from '../../RecommendButton/RecommendButtonPersona';
import { SavePersona } from '../../SaveEntity/SavePersona';

export const ManagerList: FC = () => {
  const carousel = useRef<AntCarousel>(null);
  const { uuid } = useParams();
  const { data } = useQuery<GetCardType>(GET_SPOT, {
    variables: { uuid: uuid },
  });
  const history = useHistory();

  return (
    <>
      <Carousel ref={carousel}>
        {data?.spot.managers.map((persona: AgregatedPersona) => (
          <div key={persona.uuid}>
            <SpotPage
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
          </div>
        ))}
      </Carousel>
    </>
  );
};
