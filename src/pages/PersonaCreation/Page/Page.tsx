import React, { useCallback, useMemo, useState } from 'react';
import _ from 'lodash';
import { Editor as EditorType } from 'slate/dist';

// Import the Slate editor factory.
import { createEditor } from 'slate';

// Import the Slate components and React plugin.
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { PageWrapper } from 'components/PageWrapper';
import styled from 'styled-components';
import { TopNav } from 'components/TopNav/TopNav';
import { BlockTools } from './BlockTools/BlockTools';
import { Element } from './BlockTools/EditorFunctionalities/EditorFunctionalities';
import { EditorContextProvider, EditorContextType } from './EditorContext';

const StyledPageWrapper = styled(PageWrapper)`
  position: relative;
  padding: 0px;
`;

type ActiveToolsType = 'bloc' | 'inline' | false;

export const Page = () => {
  const [activeTools, setActiveTools] = useState<ActiveToolsType>(false);
  const editor: EditorType = useMemo(() => withReact(createEditor()), []);
  const renderElement = useCallback(props => <Element {...props} />, []);

  // I need to mutate it to keep reference to last selected elements
  const editorContextValue: EditorContextType = {
    selection: null,
    closeActiveTools: () => setActiveTools(false),
  };

  // Add the initial value when setting up our state.
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]);

  return (
    <EditorContextProvider value={editorContextValue}>
      <TopNav isWithBackArrow />
      <StyledPageWrapper onBlur={() => (editorContextValue.selection = _.cloneDeep(editor.selection))}>
        <Slate
          editor={editor as ReactEditor}
          value={value}
          onChange={value => {
            // @ts-ignore
            return setValue(value);
          }}
        >
          <Editable onFocus={() => setActiveTools('bloc')} renderElement={renderElement} />
          {activeTools === 'bloc' && <BlockTools />}
        </Slate>
      </StyledPageWrapper>
    </EditorContextProvider>
  );
};
