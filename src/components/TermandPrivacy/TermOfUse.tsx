import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { TopNav } from '../TopNav/TopNav';
import { TOSContent } from './TOSContent';

const MainComponent = styled.div`
  padding: 16px 26px;
`;

export const TermOfUse: FunctionComponent = () => {
  return (
    <>
      <TopNav isWithBackArrow />
      <MainComponent>
        <TOSContent />
      </MainComponent>
    </>
  );
};
