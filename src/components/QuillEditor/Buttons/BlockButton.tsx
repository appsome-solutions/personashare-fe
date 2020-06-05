import React, { FC } from 'react';
import styled from 'styled-components';
import { Icon } from 'components/Icon';
import { Button } from 'components/Button';

export type BlockButtonType = {
  svgLink?: string;
  title?: string;
  className?: string;
  value?: number | string;
};

export const EditorButtonWrapper = styled.div`
  border-top: 1px solid ${(props) => props.theme.colors.functional.disabled};
  &:last-child {
    border-bottom: 1px solid ${(props) => props.theme.colors.functional.disabled};
  }
  display: flex;
  align-items: center;
`;

export const EditorButtonIconWrapper = styled.span`
  margin: 12px;
  border: 1px solid ${(props) => props.theme.colors.functional.disabled};
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
`;

const StyledButton = styled(Button)`
  &&& {
    display: contents;
  }
`;

export const BlockButton: FC<BlockButtonType> = ({ svgLink, title, className, value }) => (
  <EditorButtonWrapper>
    <EditorButtonIconWrapper>
      <StyledButton className={className} value={value}>
        <Icon svgLink={svgLink ?? ''} />
      </StyledButton>
    </EditorButtonIconWrapper>
    {title}
  </EditorButtonWrapper>
);
