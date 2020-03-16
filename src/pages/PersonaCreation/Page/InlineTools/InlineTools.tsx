import React from 'react';
import { useEditorContext } from '../EditorContext';

export const InlineTools = () => {
  const { setAreEditorButtonsVisible } = useEditorContext();

  return <div onClick={() => setAreEditorButtonsVisible(true)}>Inline</div>;
};
