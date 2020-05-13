import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import { Page } from 'pages/PersonaCreation/Page/Page';
import { DrawerPage } from 'components/DrawerPage/DrawerPage';
import 'react-quill/dist/quill.snow.css';
// import 'react-quill/dist/quill.bubble.css';
import { Icon } from 'components/Icon';
import { EditorButtons } from './Buttons/EditorButtons';
import AddSvg from 'assets/AddIcon.svg';

const Container = styled.div`
  width: 100%;
  height: 500px;
  & > div {
    margin-top: 100px;
    margin-bottom: 100px;
  }
`;

const StyledQuillContainer = styled.div`
  width: 100%;
`;

export const EditorBarWrapper = styled.div`
  height: 36px;
  position: fixed;
  bottom: 50px;
  width: 100%;
  z-index: 9999;
  display: flex;
  align-items: center;

  background-color: ${props => props.theme.colors.utils.background.light};
  border-top: 1px solid ${props => props.theme.colors.functional.disabled};

  ${StyledQuillContainer}:hover & {
    display: flex;
  }

  ${StyledQuillContainer}:focus & {
    display: flex;
  }
`;

export const BarIcon = styled(Icon)`
  height: 36px;
  width: 36px;
`;

export const EditorButtonWrapper = styled.div`
  border-top: 1px solid ${props => props.theme.colors.functional.disabled};
  &:last-child {
    border-bottom: 1px solid ${props => props.theme.colors.functional.disabled};
  }
  display: flex;
  align-items: center;
`;

export const EditorButtonIconWrapper = styled.span`
  margin: 12px;
  border: 1px solid ${props => props.theme.colors.functional.disabled};

  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
`;

const Separator = styled.div`
  width: 1px;
  height: 36px;
  background-color: ${props => props.theme.colors.functional.disabled};
`;

const TurnInto = styled.span`
  margin-left: 8px;
`;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
//@ts-ignore
const test = (...args) => {
  console.warn(args);
};

const Editor = {
  modules: {
    toolbar: {
      container: '#toolbar',
      handlers: {
        insertWhatever: test,
      },
    },
  },
};

const QuillEditor = () => {
  const [value, setValue] = useState('');
  const [test, setTest] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<ReactQuill | null>(null);

  const editor = ref.current?.getEditor();

  console.warn(editor);

  useEffect(() => {
    setTest(true);
  }, []);

  return (
    <Container>
      <StyledQuillContainer>
        {test && <ReactQuill theme={undefined} value={value} onChange={setValue} modules={Editor.modules} ref={ref} />}
        {/*  <ReactQuill
          ref={ref}
          theme="bubble"
          value={bubbleValue}
          onChange={setBubbleValue}
          style={{ border: '1px solid #5585ff' }}
          modules={Editor.modules}
        /> */}
        {/*   <button onClick={() => setIsOpen(true)}>OPEN</button>
        <div id="toolbar">
          <Drawer visible={isOpen} forceRender={true} getContainer="#toolbar" onClose={() => setIsOpen(false)}>
            <button className="ql-bold">B</button>
            <button className="ql-color">C</button>
            <button className="ql-insertHeart">H</button>
          </Drawer>
        </div> */}
        {/*   <CustomDrawer id="toolbarrr">
          <button className="ql-bold"></button>
          <button className="ql-color"></button>
          <button className="ql-insertHeart"></button>
        </CustomDrawer> */}

        <EditorBarWrapper id="toolbar">
          <DrawerPage
            title="test"
            OnClickComponent={() => <BarIcon svgLink={AddSvg} onClick={() => setIsVisible(true)} />}
            onClose={() => setIsVisible(false)}
            isVisible={isVisible}
            getContainer="#toolbar"
          >
            <EditorButtons />
          </DrawerPage>
          <Separator />
          <DrawerPage
            isVisible={isVisible}
            OnClickComponent={() => <TurnInto onClick={() => setIsVisible(true)}>Turn into</TurnInto>}
            onClose={() => setIsVisible(false)}
            title="Turn Into"
            getContainer="#toolbar"
          >
            <EditorButtons />
          </DrawerPage>
        </EditorBarWrapper>
      </StyledQuillContainer>
      <Page />
    </Container>
  );
};

export default QuillEditor;
