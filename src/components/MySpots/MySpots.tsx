import React, { FC, useState, useRef } from 'react';
import styled from 'styled-components';
import { Carousel as AntCarousel } from 'antd';
import { TopNav } from 'components/TopNav/TopNav';
import { PageWrapperSpaceBetween } from 'components/PageWrapper';
import { useQuery } from '@apollo/react-hooks';
import { PersonaCard } from 'components/PersonaCard/PersonaCard';
import Carousel from 'components/Carousel/Carousel';
import { gqlEntity } from 'global/graphqls/schema';
import { Spinner } from 'components/Spinner/Spinner';
import { Overlay } from 'components/Overlay/Overlay';

import { MySpotsWithoutSpots } from './MySpotsWithoutSpots';
import { Route } from 'react-router-dom';
import { GET_SPOT, GetSpotType } from '../../global/graphqls/Spot';

const CaruouselItem = styled.div`
  padding: 0 20px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 70vh;
`;

export const MySpots: FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { loading, data } = useQuery<GetSpotType>(GET_SPOT);
  const carousel = useRef<AntCarousel>(null);

  if (loading) {
    return (
      <Overlay>
        <Spinner />
      </Overlay>
    );
  }
  if (!data) {
    return <Route path="/my-spots" exact component={MySpotsWithoutSpots} />;
  }

  return (
    <div>
      <TopNav isWithBackArrow />
      <PageWrapperSpaceBetween>
        <Carousel afterChange={setCurrentSlide} ref={carousel}>
          {data.userSpots &&
            data.userSpots.map((spots: gqlEntity) => (
              <CaruouselItem key={spots.uuid}>
                <Wrapper>
                  <PersonaCard card={spots.card} />
                </Wrapper>
              </CaruouselItem>
            ))}
        </Carousel>
        <img src={`${data.userSpots[currentSlide].qrCodeLink}`} alt="QrCode" />
        {currentSlide}
      </PageWrapperSpaceBetween>
    </div>
  );
};
