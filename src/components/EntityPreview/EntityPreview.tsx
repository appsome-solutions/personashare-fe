import React, { FC } from 'react';
import styled from 'styled-components';
import { EntityPageComp } from 'components/EntityPageComp/EntityPageComp';
import { EntityPage } from 'global/graphqls/schema';

export interface EntityPreviewPropsType {
  uuidQuery: any;
  entityPage: EntityPage;
}

const PersonaPreviewWrapper = styled.div`
  height: ${(props) => props.theme.contentHeight};
  overflow: auto;
  background-color: ${(props) => props.theme.colors.utils.background.mid};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const EntityPreview: FC<EntityPreviewPropsType> = ({ uuidQuery, entityPage }) => {
  return (
    <PersonaPreviewWrapper>
      <Wrapper key={uuidQuery}>
        <EntityPageComp page={entityPage} />
      </Wrapper>
    </PersonaPreviewWrapper>
  );
};
