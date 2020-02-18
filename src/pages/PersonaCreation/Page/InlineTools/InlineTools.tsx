import React from 'react';
import { useSlate, ReactEditor } from 'slate-react';
import { Editor, Range } from 'slate';

export const InlineTools = () => {
  const editor = useSlate();
  const { selection } = editor;

  if (
    !selection ||
    !ReactEditor.isFocused(editor) ||
    Range.isCollapsed(selection) ||
    Editor.string(editor, selection) === ''
  ) {
    return null;
  }

  return <div>test</div>;
};
