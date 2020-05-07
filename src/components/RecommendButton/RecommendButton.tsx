import recommendOff from 'assets/recommendOff.svg';
import React, { FC } from 'react';
import styled from 'styled-components';

const RecommendEmpty = styled.img`
  position: relative;
  bottom: 20px;
  left: 135px;
`;

export const RecommendButtons: FC = () => {
  return <RecommendEmpty src={recommendOff} alt="Recommend Off" />;
};
