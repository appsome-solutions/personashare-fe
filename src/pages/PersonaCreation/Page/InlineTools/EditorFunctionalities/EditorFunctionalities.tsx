import React from 'react';
import { Editor } from 'slate';
import { Editor as EditorType } from 'slate/dist/index';

export type EditorInlineFormats = 'bold' | 'code' | 'italic' | 'underline';

export const isMarkActive = (editor: EditorType, format: EditorInlineFormats) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const toggleMark = (editor: EditorType, format: EditorInlineFormats) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const Leaf = ({ attributes, children, leaf }: any) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};
