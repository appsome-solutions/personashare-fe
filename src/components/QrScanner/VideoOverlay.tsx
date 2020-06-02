import React from 'react';
import styled from 'styled-components';

const DiagonalBorder = styled.div`
  width: 200px;
  height: 200px;
  transform: translateY(50%);
  bottom: 50%;
  position: absolute;
  &:before,
  &:after {
    position: absolute;
    content: '';
    width: 35px;
    height: 35px;
    z-index: -1;
    border: 3px solid white;
  }
  &:before {
    top: -2px;
    left: -2px;
    border-width: 2px 0 0 2px;
  }
  &:after {
    right: -2px;
    bottom: -2px;
    border-width: 0 2px 2px 0;
  }
`;

const ReverseDiagonalBorder = styled(DiagonalBorder as any)`
  &:before {
    top: unset;
    bottom: -2px;
    left: -2px;
    border-width: 0 0 2px 2px;
  }
  &:after {
    right: -2px;
    top: -2px;
    border-width: 2px 2px 0 0;
  }
`;

const VideoOverlay = () => (
  <>
    <DiagonalBorder />
    <ReverseDiagonalBorder />
  </>
);

export default VideoOverlay;
