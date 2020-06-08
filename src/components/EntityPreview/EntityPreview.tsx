import React, { FC } from 'react';
import styled from 'styled-components';
import { EntityPageComp } from 'components/EntityPageComp/EntityPageComp';
import { EntityPage } from 'global/graphqls/schema';

export interface EntityPreviewProps {
  uuidQuery: any;
  entityPage: EntityPage;
}

const PersonaPreviewWrapper = styled.div`
  height: ${(props) => props.theme.contentHeight};
  overflow: auto;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const EntityPreview: FC<EntityPreviewProps> = ({ uuidQuery, entityPage }) => {
  return (
    <PersonaPreviewWrapper>
      <Wrapper key={uuidQuery}>
        <EntityPageComp page={entityPage} />
      </Wrapper>
    </PersonaPreviewWrapper>
  );
};
