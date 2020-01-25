import React, { useCallback, useMemo, useState } from 'react';

// Import the Slate editor factory.
import { createEditor } from 'slate';

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react';
import { PageWrapper } from 'components/PageWrapper';
import styled from 'styled-components';
import { TopNav } from 'components/TopNav/TopNav';
import { BlockTools } from './BlockTools/BlockTools';
import { Element } from './BlockTools/EditorFunctionalities/EditorFunctionalities';

const StyledPageWrapper = styled(PageWrapper)`
  position: relative;
  padding: 0px;
`;

type ActiveToolsType = 'bloc' | 'inline' | false;

export const Page = () => {
  const [activeTools, setActiveTools] = useState<ActiveToolsType>(false);
  const editor = useMemo(() => withReact(createEditor()), []);
  const renderElement = useCallback(props => <Element {...props} />, []);

  // Add the initial value when setting up our state.
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]);

  return (
    <>
      <TopNav isWithBackArrow />
      <StyledPageWrapper>
        {/* 
  // @ts-ignore */}
        <Slate editor={editor} value={value} onChange={value => setValue(value)} onBlur={() => setActiveTools(false)}>
          <Editable onFocus={() => setActiveTools('bloc')} renderElement={renderElement} />
          {activeTools === 'bloc' && <BlockTools />}
        </Slate>
      </StyledPageWrapper>
    </>
  );
};
