import React from 'react';
import styled from 'styled-components';
import { Icon } from 'components/Icon';
import { useSlate } from 'slate-react';
import { toggleBlock, EditorBlockFormats } from '../EditorFunctionalities/EditorFunctionalities';
import { useEditorContext } from '../../EditorContext';
import { Transforms } from 'slate';

const BlockButtonWrapper = styled.div`
  border-top: 1px solid ${props => props.theme.colors.functional.disabled};
  &:last-child {
    border-bottom: 1px solid ${props => props.theme.colors.functional.disabled};
  }
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

export type BlockButtonType = {
  svgLink: string;
  title: string;
  format: EditorBlockFormats;
  addInNewLine?: boolean;
};

export const BlockButton = ({ svgLink, title, format, addInNewLine = false }: BlockButtonType) => {
  const editor = useSlate();
  const editorContext = useEditorContext();

  return (
    <BlockButtonWrapper
      onMouseDown={event => {
        event.preventDefault();

        // overriding lost selection with last one:
        editor.selection = editorContext.selection;

        if (addInNewLine && editor.selection) {
          const newNodeRow = editor.selection.anchor.path[0] + 1;

          Transforms.insertNodes(editor, [{ type: format, children: [{ text: '' }] }], {
            at: [newNodeRow],
            select: true,
          });
        } else {
          toggleBlock(editor, format);
        }

        editorContext.closeActiveTools();
        // editor.focus();
      }}
    >
      <IconWrapper>
        <Icon svgLink={svgLink} />
      </IconWrapper>
      {title}
    </BlockButtonWrapper>
  );
};
