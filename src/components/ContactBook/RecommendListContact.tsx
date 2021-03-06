import Carousel from 'components/Carousel/Carousel';
import { AgregatedPersona } from 'global/graphqls/schema';
import { PersonaCard } from 'components/PersonaCard/PersonaCard';
import React, { FC, useRef } from 'react';
import { Carousel as AntCarousel } from 'antd';
import styled from 'styled-components';
import { APP_ROUTES } from 'global/AppRouter/routes';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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

const StyledCarousel = styled(Carousel)`
  && {
    .slick-track {
      margin: auto;
    }
  }
`;

export const RecommendContactBook: FC<RecommendContactBookType> = ({ entity, className }) => {
  const carousel = useRef<AntCarousel>(null);
  const history = useHistory();
  const { t } = useTranslation();

  const allRecommendation = [...entity.recommendList, ...entity.spotRecommendList];

  return (
    <MainComponent className={className}>
      {!!allRecommendation.length && <RecommendText>{t(`RECOMMEND_TEXT`)}</RecommendText>}
      <StyledCarousel ref={carousel}>
        {allRecommendation.map((entity) => (
          <PersonaCard
            card={entity.card}
            uuid={entity.uuid}
            key={entity.uuid}
            onClick={() =>
              history.push({
                pathname:
                  // @ts-ignore
                  entity.__typename === 'AgregatedSpot'
                    ? `${APP_ROUTES.SPOT_PREVIEW(entity.uuid)}`
                    : `${APP_ROUTES.PERSONA_PREVIEW(entity.uuid)}`,
              })
            }
          />
        ))}
      </StyledCarousel>
    </MainComponent>
  );
};
