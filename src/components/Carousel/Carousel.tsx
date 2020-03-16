import React, { FC } from 'react';
import styled from 'styled-components';
import { Carousel as AntCarousel } from 'antd';
import { CarouselProps as AntCarouselProps } from 'antd/lib/carousel';

const StyledCarousel = styled(AntCarousel)`
  & .slick-slide:not(.slick-current) {
    transform: scale(0.9);
  }
`;

type CarouselProps = AntCarouselProps;

const Carousel: FC<CarouselProps> = ({ children, ...rest }) => {
  const settings = {
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <StyledCarousel dots={false} {...settings} {...rest}>
      {children}
    </StyledCarousel>
  );
};

export default Carousel;
