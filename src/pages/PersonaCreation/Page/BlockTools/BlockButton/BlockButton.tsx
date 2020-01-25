import React from 'react';
import styled from 'styled-components';
import { Icon } from 'components/Icon';
import { useSlate } from 'slate-react';
import { toggleBlock, EditorBlockFormats } from '../EditorFunctionalities/EditorFunctionalities';

const BlockButtonWrapper = styled.div`
  border-top: 1px solid ${props => props.theme.colors.functional.disabled};
  border-bottom: 1px solid ${props => props.theme.colors.functional.disabled};
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.span`
  margin: 12px;
  border: 1px solid ${props => props.theme.colors.functional.disabled};

  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
`;

type BlockButtonType = {
  svgLink: string;
  title: string;
  format: EditorBlockFormats;
};

export const BlockButton = ({ svgLink, title, format }: BlockButtonType) => {
  const editor = useSlate();
  return (
    <BlockButtonWrapper
      onMouseDown={event => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <IconWrapper>
        <Icon svgLink={svgLink} />
      </IconWrapper>
      {title}
    </BlockButtonWrapper>
  );
};
