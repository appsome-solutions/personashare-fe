import React, { FC, MouseEvent as ReactMouseEvent } from 'react';
import styled from 'styled-components';
import { Icon } from 'components/Icon';
import { Button } from 'components/Button';

export type BlockButtonType = {
  svgLink?: string;
  title?: string;
  className?: string;
  value?: number | string;
  onClick?: (event: ReactMouseEvent<HTMLElement, MouseEvent>) => void;
};

export const EditorButtonWrapper = styled.div`
  border-top: 1px solid ${(props) => props.theme.colors.functional.disabled};
  &:last-child {
    border-bottom: 1px solid ${(props) => props.theme.colors.functional.disabled};
  }
  display: flex;
  align-items: center;
  position: relative;
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
    height: 50px;
    position: absolute;
    left: 0;
    width: 100%;
    svg {
      color: ${(props) => props.theme.colors.utils.text.dark};
      height: 24px;
      margin-left: 11px;
      width: 24px;
      float: left;
    }
  }
`;

const StyledIcon = styled(Icon)`
  color: ${(props) => props.theme.colors.utils.text.dark};
  height: 24px;
  margin-left: 11px;
  width: 24px;
  float: left;
`;

export const BlockButton: FC<BlockButtonType> = ({ svgLink, title, className, value, onClick }) => {
  return (
    <EditorButtonWrapper>
      <EditorButtonIconWrapper>
        <StyledButton className={className} value={value} onClick={() => onClick && onClick()}>
          <StyledIcon svgLink={svgLink ?? ''} />
        </StyledButton>
      </EditorButtonIconWrapper>
      {title}
    </EditorButtonWrapper>
  );
};
