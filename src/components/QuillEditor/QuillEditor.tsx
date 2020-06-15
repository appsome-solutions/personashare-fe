import React, { useState, useRef, useEffect, useMemo, FC } from 'react';
import styled from 'styled-components';
import defer from 'lodash/defer';
import isString from 'lodash/isString';
import isEmpty from 'lodash/isEmpty';
import ReactQuill, { Quill as QuillClass } from 'react-quill';
import { DrawerPage } from 'components/DrawerPage/DrawerPage';
import 'react-quill/dist/quill.snow.css';
import { Icon } from 'components/Icon';
import EditorButtons from './Buttons/EditorButtons';
import AddSvg from 'assets/AddIcon.svg';
import BoldSvg from 'assets/format_bold.svg';
import ItalicSvg from 'assets/format_italic.svg';
import UnderlineSvg from 'assets/format_underlined.svg';
import CodeSvg from 'assets/code.svg';
import Quill from 'quill';
import { InlineButton } from './Buttons/InlineButton';
import EmbedUploadAssets from './EmbedComponents/EmbedUploadAssets';
import EmbedManagerList from './EmbedComponents/EmbedManagerList';

const StyledQuillContainer = styled.div`
  width: 100%;

  &&& > div > div {
    border: none;
  }

  .ql-editing {
    // tooltip box used for URLs
    z-index: 9999;
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

const ToggleabbleContainer = styled.div<{ isVisible: boolean }>`
  position: fixed;
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

const uploadAssetHandler = (editor: Quill): void => {
  const cursor = editor.getSelection()?.index || 0;
  editor.insertEmbed(cursor, 'upload-asset', {});
};

const managerListHandler = (editor: Quill): void => {
  const cursor = editor.getSelection()?.index || 0;
  editor.insertEmbed(cursor, 'manager-list', {});
};

type Range = {
  index: number;
  length: number;
};

type Props = {
  onChange?: (value: any) => void;
  initialValue?: string;
  editable?: boolean;
};

QuillClass.register(
  {
    'formats/upload-asset': EmbedUploadAssets,
    'formats/manager-list': EmbedManagerList,
  },
  true
);

const QuillEditor: FC<Props> = ({ onChange, initialValue = '', editable = true }) => {
  const [isRendered, setIsRendered] = useState(false);
  const [isRefAttached, setIsRefAttached] = useState(false);
  const [isTurnIntoVisible, setIsTurnIntoVisible] = useState(false);
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [isInlineVisible, setIsInlineVisible] = useState(false);
  const [embedBlots, setEmbedBlots] = useState<any[]>([]);
  const ref = useRef<ReactQuill | null>(null);
  const turnIntoRef = useRef<boolean>(false);

  const editor = ref.current?.getEditor();

  const handleSelectionChange = (range: Range | any): void => {
    // sometimes delta object is passed to this handler, it has 'ops' prop, ignore it
    if (range?.ops) {
      return;
    }
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
              insertIntoEditor((ref.current?.getEditor() as unknown) as Quill, value, 'header'),
            'list-newLine': (value: string) =>
              insertIntoEditor((ref.current?.getEditor() as unknown) as Quill, value, 'list'),
            'blockquote-newLine': (value: boolean) =>
              insertIntoEditor((ref.current?.getEditor() as unknown) as Quill, value, 'blockquote'),
            'code-block-newLine': (value: boolean) =>
              insertIntoEditor((ref.current?.getEditor() as unknown) as Quill, value, 'code-block'),
            'upload-asset': () => uploadAssetHandler((ref.current?.getEditor() as unknown) as Quill),
            'manager-list': () => managerListHandler((ref.current?.getEditor() as unknown) as Quill),
          },
        },
      },
    }),
    []
  );

  const onMount = (blots: any): void => {
    setEmbedBlots((embedBlots) => [...embedBlots, ...blots]);
  };

  const onUnmount = (unmountedBlot: any): void => {
    setEmbedBlots((embedBlots) => embedBlots.filter((blot) => blot.id !== unmountedBlot.id));
  };

  useEffect(() => {
    setIsRendered(true);
    if (isRendered) {
      setIsRefAttached(true);
    }
  }, [isRendered]);

  useEffect(() => {
    if (editor) {
      let blots: any[] = [];
      // @ts-ignore
      editor.scroll.emitter.on('blot-mount', (blot) => {
        blots.push(blot);
        defer(() => {
          if (blots.length > 0) {
            onMount(blots);
            blots = [];
          }
        });
      });
      // @ts-ignore
      editor.scroll.emitter.on('blot-unmount', onUnmount);
      const parsedValue = !isEmpty(initialValue) && isString(initialValue) && JSON.parse(initialValue);
      parsedValue && editor.setContents(parsedValue as any);
      if (!editable) {
        editor.enable(false);
      }
    }
    // dependencies are missing on purpose, this hook should run only when ref got attached
  }, [isRefAttached]);

  return (
    <StyledQuillContainer>
      {isRendered && (
        <ReactQuill
          theme={undefined}
          onChange={(value, delta, source, editor) => {
            if (value && delta && source && editor) {
              const currentDelta = editor.getContents();
              onChange && onChange(currentDelta);
              setIsTurnIntoVisible(false);
              setIsAddVisible(false);
            }
          }}
          onChangeSelection={handleSelectionChange}
          modules={Editor.modules}
          placeholder={editable ? 'Edit card...' : ''}
          ref={ref}
        />
      )}
      {isRendered && embedBlots?.map((embedBlot) => embedBlot.renderPortal(embedBlot.id))}
      {editable ? (
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
            <InlineButton className={`ql-code`} svgLink={CodeSvg} />
            <InlineButton className={`ql-italic`} svgLink={ItalicSvg} />
            <InlineButton className={`ql-underline`} svgLink={UnderlineSvg} />
            <InlineButton className={`ql-link`} svgLink={UnderlineSvg} />
          </ToggleabbleContainer>
        </EditorBarWrapper>
      ) : (
        // this is need for Quill to don't crash...
        <div id="toolbar"></div>
      )}
    </StyledQuillContainer>
  );
};

export default QuillEditor;
