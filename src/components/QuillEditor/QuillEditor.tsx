import React, { useState, useRef, useEffect, useMemo, FC } from 'react';
import styled from 'styled-components';
import defer from 'lodash/defer';
import isString from 'lodash/isString';
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';
import map from 'lodash/map';
import omit from 'lodash/omit';
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
import AlignCenterSvg from 'assets/format_align_center-24px.svg';
import AlignRightSvg from 'assets/format_align_right-24px.svg';
import JustifySvg from 'assets/format_align_justify-24px.svg';
import PureQuill from 'quill';
import { InlineButton } from './Buttons/InlineButton';
import EmbedUploadAssets from './EmbedComponents/EmbedUploadAssets';
import EmbedManagerList from './EmbedComponents/EmbedManagerList';
import EmbedParticipantList from './EmbedComponents/EmbedParticipantList';
import { UploadAssetsProps } from 'components/UploadAssets/UploadAssets';
import { InvitationsProps } from 'components/SpotBook/ManagerList/EditModeManager';
// @ts-ignore
import imageUpload from 'quill-plugin-image-upload';
import { uploadAssets } from '../CreateSpotAndPersona/CreatePage/uploadAssets';
import { useStorage } from '../../global/Storage';
import { useUserContext } from '../../global/UserContext/UserContext';
import { useTranslation } from 'react-i18next';

const StyledQuillContainer = styled.div`
  width: 100%;

  &&& > div > div {
    border: none;
  }

  .ql-toolbar {
    border: none;
  }

  .ql-editing {
    // tooltip box used for URLs
    z-index: 9999;
  }

  &&& {
    .quill-plugin-image-upload-placeholder:not([id]) {
      display: block;
      width: auto;
      height: auto;
      animation: none;
      border-radius: 0;
      border: none;
    }
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

const insertIntoEditor = (editor: PureQuill, value: string | boolean | number, type: string): void => {
  const cursor = editor.getSelection()?.index || 0;
  editor.insertText(cursor + 1, '\n', type, value);
  editor.setSelection(cursor + 1, 0);
};

const embedHandler = (editor: PureQuill, editorComponentName: string): void => {
  const cursor = editor.getSelection()?.index || 0;
  const delta = editor.getContents();
  const isAlreadyInEditor = delta.ops
    .map((el) => el.insert)
    .some((item) => isObject(item) && Object.keys(item).includes(editorComponentName));
  if (isAlreadyInEditor) {
    insertIntoEditor(editor, '', 'h3');
    return;
  }
  editor.insertEmbed(cursor, editorComponentName, {});
};

const participantListHandler = (editor: PureQuill) => embedHandler(editor, 'participant-list');

const uploadAssetHandler = (editor: PureQuill): void => {
  const cursor = editor.getSelection()?.index || 0;
  const delta = editor.getContents();
  const isAlreadyInEditor = delta.ops
    .map((el) => el.insert)
    .some((item) => isObject(item) && Object.keys(item).includes('upload-asset'));
  if (isAlreadyInEditor) {
    insertIntoEditor(editor, '', 'h3');
    return;
  }
  editor.insertEmbed(cursor, 'upload-asset', {});
};

const managerListHandler = (editor: PureQuill): void => {
  const delta = editor.getContents();
  const isAlreadyInEditor = delta.ops
    .map((el) => el.insert)
    .some((item) => isObject(item) && Object.keys(item).includes('manager-list'));
  if (isAlreadyInEditor) {
    insertIntoEditor(editor, '', 'h3');
    return;
  }
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
  uploadAssetsProps?: UploadAssetsProps;
  managerListProps?: InvitationsProps;
  participantListProps?: any;
  disabledEmbedElements?: ('upload-asset' | 'manager-list' | 'participant-list')[];
};

QuillClass.register(
  {
    'formats/upload-asset': EmbedUploadAssets,
    'formats/manager-list': EmbedManagerList,
    'formats/participant-list': EmbedParticipantList,
  },
  true
);

const Link = QuillClass.import('formats/link');
Link.sanitize = (url: string): string => {
  const pattern = /^((http|https|ftp):\/\/)/;
  if (!pattern.test(url)) {
    return 'http://' + url;
  }
  return url;
};

const QuillEditor: FC<Props> = ({
  onChange,
  initialValue = '',
  editable = true,
  uploadAssetsProps,
  managerListProps,
  participantListProps,
  disabledEmbedElements,
}) => {
  const { t } = useTranslation();
  const [isRendered, setIsRendered] = useState(false);
  const [isRefAttached, setIsRefAttached] = useState(false);
  const [isTurnIntoVisible, setIsTurnIntoVisible] = useState(false);
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [isInlineVisible, setIsInlineVisible] = useState(false);
  const [embedBlots, setEmbedBlots] = useState<Record<string, any>>({});
  const ref = useRef<ReactQuill | null>(null);
  const { storageRef } = useStorage();
  const { user } = useUserContext();
  const turnIntoRef = useRef<boolean>(false);

  const { Quill } = ReactQuill;

  Quill.register('modules/imageUpload', imageUpload);

  const propsMapper: Record<string, UploadAssetsProps | InvitationsProps | undefined> = {
    'upload-asset': uploadAssetsProps,
    'manager-list': managerListProps,
    'participant-list': participantListProps,
  };

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

  const Editor = useMemo(() => {
    if (!storageRef) {
      return null;
    }

    return {
      modules: {
        toolbar: {
          image: 'image',
          container: '#toolbar',
          handlers: {
            'header-newLine': (value: number) =>
              insertIntoEditor((ref.current?.getEditor() as unknown) as PureQuill, value, 'header'),
            'list-newLine': (value: string) =>
              insertIntoEditor((ref.current?.getEditor() as unknown) as PureQuill, value, 'list'),
            'blockquote-newLine': (value: boolean) =>
              insertIntoEditor((ref.current?.getEditor() as unknown) as PureQuill, value, 'blockquote'),
            'code-block-newLine': (value: boolean) =>
              insertIntoEditor((ref.current?.getEditor() as unknown) as PureQuill, value, 'code-block'),
            'upload-asset': () => uploadAssetHandler((ref.current?.getEditor() as unknown) as PureQuill),
            'manager-list': () => managerListHandler((ref.current?.getEditor() as unknown) as PureQuill),
            'participant-list': () => participantListHandler((ref.current?.getEditor() as unknown) as PureQuill),
          },
        },
        imageUpload: {
          upload: async (file: File) => {
            if (!user) {
              return null;
            }
            const uploadedAssets = await uploadAssets(storageRef, user.uuid, [
              {
                name: `editorImg_${Date.now()}_${file.name}.jpg`,
                blob: file || null,
                metaData: { customMetadata: { assetType: 'EDITOR_IMAGE' } },
              },
            ]);

            return uploadedAssets[0].url;
          },
        },
      },
    };
  }, []);

  const onMount = (blots: any): void => {
    const embeds = blots.reduce(
      (memo: any, blot: any) => {
        memo[blot.id] = blot;
        return memo;
      },
      { ...embedBlots }
    );
    setEmbedBlots(embeds);
  };

  const onUnmount = (unmountedBlot: any): void => {
    const filteredBlots = omit(embedBlots, unmountedBlot.id);
    setEmbedBlots(filteredBlots);
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
  }, [isRefAttached, initialValue]);

  if (!storageRef) {
    return null;
  }

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
          modules={Editor?.modules}
          placeholder={editable ? `${t('CREATION_STEP_3_INPUT_PLACEHOLDER')}` : ''}
          ref={ref}
        />
      )}
      {isRendered &&
        map(embedBlots, (embedBlot) => {
          const componentProps = propsMapper[embedBlot.statics.blotName as string] || {};
          return embedBlot.renderPortal(embedBlot.id, componentProps, editable);
        })}
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
              <EditorButtons addInNewLine={true} disabledEmbedElements={disabledEmbedElements} />
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
                  {t('TURN_INTO_BUTTON')}
                </TurnInto>
              )}
              onClose={() => setIsAddVisible(false)}
              title={t('TURN_INTO_BUTTON')}
              getContainer="#toolbar"
            >
              <EditorButtons disabledEmbedElements={disabledEmbedElements} />
            </DrawerPage>
          </ToggleabbleContainer>
          <ToggleabbleContainer isVisible={isInlineVisible}>
            <InlineButton className={`ql-bold`} svgLink={BoldSvg} />
            <InlineButton className={`ql-code`} svgLink={CodeSvg} />
            <InlineButton className={`ql-italic`} svgLink={ItalicSvg} />
            <InlineButton className={`ql-underline`} svgLink={UnderlineSvg} />
            <InlineButton className={`ql-link`} svgLink={UnderlineSvg} />
            <InlineButton className={`ql-align`} svgLink={AlignCenterSvg} value="center" />
            <InlineButton className={`ql-align`} svgLink={AlignRightSvg} value="right" />
            <InlineButton className={`ql-align`} svgLink={JustifySvg} value="justify" />
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
