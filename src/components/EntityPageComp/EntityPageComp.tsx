import React, { FC } from 'react';
import { PersonaCircle, PersonaCircleWrapper } from 'components/PersonaCircle/PersonaCircle';
import { BackgroundPlaceholder } from 'components/BackgroundPlaceholder/BackgroundPlaceholder';
import { EntityPage } from 'global/graphqls/schema';
import styled from 'styled-components';

export interface PageProps {
  page: EntityPage;
}

const EntityPageMain = styled.div``;
const BackgroundPlaceholderStyle = styled(BackgroundPlaceholder)`
  width: 100%;
`;

const PersonaCircleWrapperStyle = styled(PersonaCircleWrapper)`
  max-width: 100%;
`;

export const EntityPageComp: FC<PageProps> = ({ page }) => {
  return (
    <EntityPageMain>
      <BackgroundPlaceholderStyle background={page.background} alt="Card background">
        <PersonaCircleWrapperStyle>
          <PersonaCircle avatar={page.avatar} alt="Avatar card" />
        </PersonaCircleWrapperStyle>
      </BackgroundPlaceholderStyle>
    </EntityPageMain>
  );
};
