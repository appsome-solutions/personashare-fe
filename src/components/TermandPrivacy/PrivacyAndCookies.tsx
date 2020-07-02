import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { TopNav } from '../TopNav/TopNav';
import { PACContent } from './PACContent';

const MainComponent = styled.div`
  padding: 16px 26px;
`;

export const PrivacyAndCookies: FunctionComponent = () => {
  return (
    <>
      <TopNav isWithBackArrow />
      <MainComponent>
        <PACContent />
      </MainComponent>
    </>
  );
};
