import React, { useState, useRef, useEffect, useMemo, FC } from 'react';
import styled from 'styled-components';
import ReactQuill, { Quill as QuillClass } from 'react-quill';
import { DrawerPage } from 'components/DrawerPage/DrawerPage';
import 'react-quill/dist/quill.snow.css';
import { Icon } from 'components/Icon';
import { EditorButtons } from './Buttons/EditorButtons';
import AddSvg from 'assets/AddIcon.svg';
import BoldSvg from 'assets/format_bold.svg';
import ItalicSvg from 'assets/format_italic.svg';
import UnderlineSvg from 'assets/format_underlined.svg';
import CodeSvg from 'assets/code.svg';
import Quill from 'quill';
import { InlineButton } from './Buttons/InlineButton';
import CustomEmbed from './EmbedComponents/CustomEmbedComponent';

const StyledQuillContainer = styled.div`
  width: 100%;

  &&& > div > div {
    border: none;
  }
`;

export const EditorBarWrapper = styled.div`
  height: 36px;
  position: fixed;
  bottom: 50px;
  left: 0;
  width: 100%;
  z-index: 9999;
  display: none;
  align-items: center;
  background-color: ${(props) => props.theme.colors.utils.background.light};
  border-top: 1px solid ${(props) => props.theme.colors.functional.disabled};
  ${StyledQuillContainer}:hover & {
    display: flex;
  }

  ${StyledQuillContainer}:focus & {
    display: flex;
  }

  &:focus-within {
    display: flex;
  }
`;

export const BarIcon = styled(Icon)`
  height: 36px;
  width: 36px;
`;

export const EditorButtonWrapper = styled.div`
  border-top: 1px solid ${(props) => props.theme.colors.functional.disabled};
  &:last-child {
    border-bottom: 1px solid ${(props) => props.theme.colors.functional.disabled};
  }
  display: flex;
  align-items: center;
`;

export const EditorButtonIconWrapper = styled.span`
  margin: 12px;
  border: 1px solid ${(props) => props.theme.colors.functional.disabled};

  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
`;

const ToggleabbleContainer = styled.div<{ isVisible: boolean }>`
  display: ${(props) => (props.isVisible ? 'flex' : 'none')};
`;

const Separator = styled.div`
  width: 1px;
  height: 36px;
  background-color: ${(props) => props.theme.colors.functional.disabled};
`;

const TurnInto = styled.span`
  margin-left: 8px;
`;

const insertIntoEditor = (editor: Quill, value: string | boolean | number, type: string): void => {
  const cursor = editor.getSelection()?.index || 0;
  editor.insertText(cursor + 1, '\n', type, value);
  editor.setSelection(cursor + 1, 0);
};

const customHeaderHandler = (editor: Quill, value: number): void => {
  insertIntoEditor(editor, value, 'header');
};

const customListHandler = (editor: Quill, value: string): void => {
  insertIntoEditor(editor, value, 'list');
};

const customBlockQuoteHandler = (editor: Quill, value: boolean): void => {
  insertIntoEditor(editor, value, 'blockquote');
};

const customHandler = (editor: Quill): void => {
  const cursor = editor.getSelection()?.index || 0;
  editor.insertEmbed(cursor, 'custom', {});
  console.warn('custom handler called', editor);
};

type Range = {
  index: number;
  length: number;
};

type Props = {
  onChange?: (value: any) => void;
  initialValue?: string;
};

QuillClass.register(
  {
    'formats/custom': CustomEmbed,
  },
  true
);

const QuillEditor: FC<Props> = ({ onChange, initialValue = '' }) => {
  const [value, setValue] = useState<any>(initialValue);
  const [isRendered, setIsRendered] = useState(false);
  const [isTurnIntoVisible, setIsTurnIntoVisible] = useState(false);
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [isInlineVisible, setIsInlineVisible] = useState(false);
  const ref = useRef<ReactQuill | null>(null);
  const turnIntoRef = useRef<boolean>(false);

  const editor = ref.current?.getEditor();

  const handleSelectionChange = (range: Range): void => {
    if (!range?.length) {
      setIsInlineVisible(false);
      return;
    }
    setIsInlineVisible(true);
  };

  const Editor = useMemo(
    () => ({
      modules: {
        toolbar: {
          container: '#toolbar',
          handlers: {
            'header-newLine': (value: number) =>
              customHeaderHandler((ref.current?.getEditor() as unknown) as Quill, value),
            'list-newLine': (value: string) => customListHandler((ref.current?.getEditor() as unknown) as Quill, value),
            'blockquote-newLine': (value: boolean) =>
              customBlockQuoteHandler((ref.current?.getEditor() as unknown) as Quill, value),
            custom: () => customHandler((ref.current?.getEditor() as unknown) as Quill),
          },
        },
      },
    }),
    []
  );

  useEffect(() => {
    setIsRendered(true);
  }, []);

  return (
    <StyledQuillContainer>
      {isRendered && (
        <ReactQuill
          theme={undefined}
          value={value}
          onChange={(value, delta, source, editor) => {
            if (value && delta && source && editor) {
              const currentDelta = editor.getContents();
              setValue(currentDelta);
              onChange && onChange(currentDelta);
              setIsTurnIntoVisible(false);
              setIsAddVisible(false);
            }
          }}
          onChangeSelection={handleSelectionChange}
          modules={Editor.modules}
          // formats={['custom', 'bold', 'header1']}
          placeholder="Edit card..."
          ref={ref}
        />
      )}
      <EditorBarWrapper id="toolbar">
        <ToggleabbleContainer isVisible={!isInlineVisible}>
          <DrawerPage
            title="Add in a new line"
            OnClickComponent={() => (
              <BarIcon
                svgLink={AddSvg}
                onClick={() => {
                  editor?.focus();
                  setIsTurnIntoVisible(true);
                  turnIntoRef.current = false;
                }}
              />
            )}
            onClose={() => setIsTurnIntoVisible(false)}
            isVisible={isTurnIntoVisible}
            getContainer="#toolbar"
          >
            <EditorButtons addInNewLine={true} />
          </DrawerPage>
          <Separator />
          <DrawerPage
            isVisible={isAddVisible}
            OnClickComponent={() => (
              <TurnInto
                onClick={() => {
                  editor?.focus();
                  setIsAddVisible(true);
                  turnIntoRef.current = true;
                }}
              >
                Turn into
              </TurnInto>
            )}
            onClose={() => setIsAddVisible(false)}
            title="Turn Into"
            getContainer="#toolbar"
          >
            <EditorButtons />
          </DrawerPage>
        </ToggleabbleContainer>
        <ToggleabbleContainer isVisible={isInlineVisible}>
          <InlineButton className={`ql-bold`} svgLink={BoldSvg} />
          <InlineButton className={`ql-code-block`} svgLink={CodeSvg} />
          <InlineButton className={`ql-italic`} svgLink={ItalicSvg} />
          <InlineButton className={`ql-underline`} svgLink={UnderlineSvg} />
          <InlineButton className={`ql-custom`} svgLink={UnderlineSvg} />
        </ToggleabbleContainer>
      </EditorBarWrapper>
    </StyledQuillContainer>
  );
};

export default QuillEditor;
