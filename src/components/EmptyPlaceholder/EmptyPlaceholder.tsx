import React, { FC } from 'react';
import BoxInSpots from 'assets/BoxInSpots.svg';
import styled from 'styled-components';

const TextAndImg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextUnderImg = styled.h5`
  opacity: 0.5;
`;

type EmptyPlaceholderType = {
  text: string;
};

export const EmptyPlaceholder: FC<EmptyPlaceholderType> = ({ text }) => {
  return (
    <TextAndImg>
      <img src={BoxInSpots} alt={text} />
      <TextUnderImg>{text}</TextUnderImg>
    </TextAndImg>
  );
};
