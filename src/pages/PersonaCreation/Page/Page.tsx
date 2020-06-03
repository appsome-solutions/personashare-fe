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
import { Range } from 'slate/dist/interfaces/range';
import { Leaf } from './InlineTools/EditorFunctionalities/EditorFunctionalities';

const StyledPageWrapper = styled(PageWrapper)`
  position: relative;
  padding: 0;
  min-height: calc(100vh - 108px);
`;

const isSelected = (selection: Range | null) => {
  if (!selection) {
    return false;
  }

  return selection.anchor.offset !== selection.focus.offset;
};

const getActiveTool = (editor: EditorType): ActiveToolsType => {
  const { selection } = editor;

  if (!selection) {
    return false;
  }
  if (isSelected(editor.selection)) {
    return 'inline';
  }

  return 'bloc';
};

export const Page: FC = () => {
  const editor: EditorType = useMemo(() => withReact(createEditor()), []);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const [activeToolbar, setActiveToolbar] = useState<ActiveToolsType>(false);
  const [selection, setSelection] = useState<Range | null>(null);
  const [areEditorButtonsVisible, setAreEditorButtonsVisible] = useState(false);

  // I need to mutate it to keep reference to last selected elements
  const editorContextValue: EditorContextType = {
    selection,
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
      <StyledPageWrapper>
        <Slate
          editor={editor as ReactEditor}
          value={value}
          onChange={(value: Node[]) => {
            setValue(value as EditorElement[]);
            if (!areEditorButtonsVisible || (isSelected(selection) && !isSelected(editor.selection))) {
              setSelection(_.cloneDeep(editor.selection));
              setActiveToolbar(getActiveTool(editor));
            }
          }}
        >
          <StyledEditable
            activeTools={activeToolbar}
            renderElement={renderElement}
            renderLeaf={(props) => <Leaf {...props} />}
          />
          {activeToolbar === 'inline' && <InlineTools />}
          {activeToolbar === 'bloc' && <BlockTools />}
        </Slate>
      </StyledPageWrapper>
    </EditorContextProvider>
  );
};
