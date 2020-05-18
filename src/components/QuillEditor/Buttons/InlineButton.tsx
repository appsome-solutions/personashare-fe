import React, { FC } from 'react';
import styled from 'styled-components';
import { Icon } from 'components/Icon';
import { Button } from 'components/Button';

type Props = {
  svgLink?: any;
  className?: string;
  value?: number | string;
};

export const EditorButtonWrapper = styled.div`
  border-right: 1px solid ${props => props.theme.colors.functional.disabled};
  display: flex;
  align-items: center;
`;

export const EditorButtonIconWrapper = styled.span`
  height: 24px;
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  width: 24px;
  height: 24px;
  &&& {
    display: contents;
  }
`;

export const InlineButton: FC<Props> = ({ svgLink, className, value }) => {
  return (
    <EditorButtonWrapper>
      <EditorButtonIconWrapper>
        <StyledButton className={className} value={value}>
          <Icon svgLink={svgLink ?? ''} />
        </StyledButton>
      </EditorButtonIconWrapper>
    </EditorButtonWrapper>
  );
};
