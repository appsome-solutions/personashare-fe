import React, { FC, useCallback, useMemo, useState } from 'react';
import { ReactEditor, Slate, withReact } from 'slate-react';
import { createEditor, Editor as EditorType, Element as EditorElement, Node } from 'slate';

// TODO: move editor to the component
import { ActiveToolsType, StyledEditable } from 'pages/PersonaCreation/Page/EditorStyles';
import { BlockTools } from 'pages/PersonaCreation/Page/BlockTools/BlockTools';
import { Element } from 'pages/PersonaCreation/Page/BlockTools/EditorFunctionalities/EditorFunctionalities';
import { EditorContextProvider, EditorContextType } from 'pages/PersonaCreation/Page/EditorContext';

type EditorProps = {
  hasError: boolean;
  onChange(value: Node[]): void;
};

export const Editor: FC<EditorProps> = ({ hasError, onChange }) => {
  const editor: EditorType = useMemo(() => withReact(createEditor()), []);
  const [activeTools, setActiveTools] = useState<ActiveToolsType>(false);
  const [value, setValue] = useState<EditorElement[]>([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);
  const renderElement = useCallback(props => <Element {...props} />, []);

  const editorContextValue: EditorContextType = {
    selection: null,
    activeToolbar: false,
    areEditorButtonsVisible: false,
    setAreEditorButtonsVisible: () => {},
    closeActiveTools: () => setActiveTools(false),
  };

  return (
    <EditorContextProvider value={editorContextValue}>
      <Slate
        editor={editor as ReactEditor}
        value={value}
        onChange={(value: Node[]) => {
          setValue(value as EditorElement[]);
          onChange(value);
        }}
      >
        <StyledEditable
          activeTools={activeTools}
          onFocus={() => setActiveTools('bloc')}
          renderElement={renderElement}
          hasError={hasError}
          placeholder="Create Your page content..."
        />
        {activeTools === 'bloc' && <BlockTools />}
      </Slate>
    </EditorContextProvider>
  );
};
