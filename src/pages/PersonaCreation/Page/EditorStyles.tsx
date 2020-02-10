import React, { FC } from 'react';
import styled from 'styled-components';
import { Editable } from 'slate-react';
import { EditableProps } from 'slate-react/dist/components/editable';

export type ActiveToolsType = 'bloc' | 'inline' | false;

type StyledPageWrapperType = {
  activeTools: ActiveToolsType;
};

type StyledEditableProps = StyledPageWrapperType & EditableProps;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const StyledEditable = styled<FC<StyledEditableProps>>(({ activeTools, ...restProps }: StyledEditableProps) => (
  <Editable {...restProps} />
))`
  flex: 1;
  margin: 8px;
  margin-bottom: ${props => (props.activeTools === 'bloc' ? '36px' : '0')};

  blockquote {
    border-left: 4px solid ${props => props.theme.colors.main.primary};
    margin-left: 8px;
    padding-left: 8px;
    ${props => props.theme.typography.subtitle1};
    margin-top: 4px;
    margin-bottom: 4px;
  }

  ol {
    padding-left: 36px;

    li {
      padding-left: 4px;
    }
  }
`;
