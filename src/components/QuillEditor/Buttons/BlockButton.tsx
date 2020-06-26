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

const StyledQlButton = styled.button`
  &&& {
    width: 100%;
    height: 56px;
    padding: 0px;
    display: flex;
    color: darkblue;
    justify-content: flex-start;
    align-items: center;
  }
`;

export const EditorButtonWrapper = styled.div`
  &&& {
    border-top: 1px solid ${(props) => props.theme.colors.functional.disabled};
    &:last-child {
      border-bottom: 1px solid ${(props) => props.theme.colors.functional.disabled};
    }
    display: flex;
    align-items: center;
  }
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
    <StyledQlButton className={className} value={value}>
      <EditorButtonIconWrapper>
        <StyledButton>
          <Icon svgLink={svgLink ?? ''} />
        </StyledButton>
      </EditorButtonIconWrapper>
      {title}
    </StyledQlButton>
  </EditorButtonWrapper>
);
