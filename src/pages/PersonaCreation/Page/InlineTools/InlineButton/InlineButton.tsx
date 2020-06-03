import React from 'react';
import { EditorInlineFormats, isMarkActive, toggleMark } from '../EditorFunctionalities/EditorFunctionalities';
import { BarIcon, EditorButtonWrapper } from '../../EditorStyles';
import { useSlate } from 'slate-react';
import styled from 'styled-components';

export type InlineButtonType = {
  format: EditorInlineFormats;
  svgLink: string;
};

type InlineButtonWrapperType = {
  active: boolean;
};

const StyledEditorButtonWrapper = styled(EditorButtonWrapper)<InlineButtonWrapperType>`
  background-color: ${(props) => props.active && 'rgba(0,0,0,0.2)'};
`;

export const InlineButton = ({ format, svgLink }: InlineButtonType) => {
  const editor = useSlate();
  return (
    <StyledEditorButtonWrapper
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <BarIcon svgLink={svgLink} />
    </StyledEditorButtonWrapper>
  );
};
