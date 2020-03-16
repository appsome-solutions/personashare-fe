import React, { useCallback, useMemo, useState, FC } from 'react';
import _ from 'lodash';
import { Editor as EditorType, Node, Element as EditorElement } from 'slate/dist';

// Import the Slate editor factory.
import { createEditor } from 'slate';

// Import the Slate components and React plugin.
import { Slate, withReact, ReactEditor } from 'slate-react';
import { PageWrapper } from 'components/PageWrapper';
import styled from 'styled-components';
import { TopNav } from 'components/TopNav/TopNav';
import { BlockTools } from './BlockTools/BlockTools';
import { Element } from './BlockTools/EditorFunctionalities/EditorFunctionalities';
import { EditorContextProvider, EditorContextType } from './EditorContext';
import { ActiveToolsType, StyledEditable } from './EditorStyles';
import { InlineTools } from './InlineTools/InlineTools';

const StyledPageWrapper = styled(PageWrapper)`
  position: relative;
  padding: 0;
  min-height: calc(100vh - 108px);
`;

const getActiveTool = (editor: EditorType): ActiveToolsType => {
  const { selection } = editor;

  if (!selection) {
    return false;
  }
  if (selection.anchor.offset !== selection.focus.offset) {
    return 'inline';
  }

  return 'bloc';
};

export const Page: FC = () => {
  const editor: EditorType = useMemo(() => withReact(createEditor()), []);
  const renderElement = useCallback(props => <Element {...props} />, []);
  const [activeToolbar, setActiveToolbar] = useState<ActiveToolsType>(false);
  const [areEditorButtonsVisible, setAreEditorButtonsVisible] = useState(false);

  // I need to mutate it to keep reference to last selected elements
  const editorContextValue: EditorContextType = {
    selection: null,
    activeToolbar,
    areEditorButtonsVisible,
    setAreEditorButtonsVisible,
    closeActiveTools: () => setAreEditorButtonsVisible(false),
  };

  // Add the initial value when setting up our state.
  const [value, setValue] = useState<EditorElement[]>([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]);

  return (
    <EditorContextProvider value={editorContextValue}>
      <TopNav isWithBackArrow />
      <StyledPageWrapper
        onBlur={() => {
          editorContextValue.selection = _.cloneDeep(editor.selection);
        }}
      >
        <Slate
          editor={editor as ReactEditor}
          value={value}
          onChange={(value: Node[]) => {
            setValue(value as EditorElement[]);
            if (!areEditorButtonsVisible) {
              setActiveToolbar(getActiveTool(editor));
            }
          }}
        >
          {activeToolbar === 'inline' && <InlineTools />}
          <StyledEditable activeTools={activeToolbar} renderElement={renderElement} />
          {activeToolbar === 'bloc' && <BlockTools />}
        </Slate>
      </StyledPageWrapper>
    </EditorContextProvider>
  );
};
