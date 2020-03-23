import React, { forwardRef, ReactNode } from 'react';
import styled from 'styled-components';
import { Carousel as AntCarousel } from 'antd';
import { CarouselProps as AntCarouselProps } from 'antd/lib/carousel';

const StyledCarousel = styled(AntCarousel)`
  & .slick-slide:not(.slick-current) {
    transform: scale(0.9);
  }
`;

type CarouselProps = {
  children?: ReactNode | ReactNode[];
} & AntCarouselProps;

// eslint-disable-next-line react/display-name
const Carousel = forwardRef<AntCarousel, CarouselProps>(({ children, ...rest }, ref) => {
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
    <StyledCarousel dots={false} {...settings} {...rest} ref={ref}>
      {children}
    </StyledCarousel>
  );
});

export default Carousel;
