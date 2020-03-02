import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { Editable } from 'slate-react';
import { EditableProps } from 'slate-react/dist/components/editable';

export type ActiveToolsType = 'bloc' | 'inline' | false;

type StyledPageWrapperType = {
  activeTools: ActiveToolsType;
  hasError?: boolean;
};

type StyledEditableProps = StyledPageWrapperType & EditableProps;

const mimicFocus = css`
  outline: none;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const StyledEditable = styled<FC<StyledEditableProps>>(
  ({ activeTools, hasError, ...restProps }: StyledEditableProps) => <Editable {...restProps} />
)`
  flex: 1;
  padding: 8px;
  margin-bottom: ${props => (props.activeTools === 'bloc' ? '36px' : '0')};
  transition: all 0.3s;
  touch-action: manipulation;
  border: ${props => (props.hasError ? '1px solid #E62B33' : 0)};

  ${props => (props.activeTools === 'bloc' ? mimicFocus : '')};

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
