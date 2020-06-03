import React from 'react';
import { Icon } from 'components/Icon';
import { useSlate } from 'slate-react';
import { toggleBlock, EditorBlockFormats } from '../EditorFunctionalities/EditorFunctionalities';
import { useEditorContext } from '../../EditorContext';
import { Transforms } from 'slate';
import { EditorButtonWrapper, EditorButtonIconWrapper } from '../../EditorStyles';

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
    <EditorButtonWrapper
      onMouseDown={(event) => {
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
      <EditorButtonIconWrapper>
        <Icon svgLink={svgLink} />
      </EditorButtonIconWrapper>
      {title}
    </EditorButtonWrapper>
  );
};
