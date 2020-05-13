import React from 'react';
import styled from 'styled-components';
import { Icon } from 'components/Icon';
import { Button } from 'components/Button';

export type BlockButtonType = {
  format?: string;
  svgLink?: any;
  title: string;
  addInNewLine?: boolean;
  className?: string;
};

export const EditorButtonWrapper = styled.div`
  border-top: 1px solid ${props => props.theme.colors.functional.disabled};
  &:last-child {
    border-bottom: 1px solid ${props => props.theme.colors.functional.disabled};
  }
  display: flex;
  align-items: center;
`;

export const EditorButtonIconWrapper = styled.span`
  margin: 12px;
  border: 1px solid ${props => props.theme.colors.functional.disabled};

  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
`;

export const BlockButton = ({ svgLink, title, className }: BlockButtonType) => {
  return (
    <EditorButtonWrapper>
      <EditorButtonIconWrapper>
        <Button className={className}>
          <Icon svgLink={svgLink ?? ''} />
        </Button>
      </EditorButtonIconWrapper>
      {title}
    </EditorButtonWrapper>
  );
};
