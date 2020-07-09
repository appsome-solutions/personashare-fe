import React, { memo } from 'react';
import styled from 'styled-components';
import { BlockButton } from './BlockButton';
import TextSvg from 'assets/editor_text.svg';
import Heading1 from 'assets/editor_heading1.svg';
import Heading2 from 'assets/editor_heading2.svg';
import QuoteSvg from 'assets/editor_quote.svg';
import NumberedListSvg from 'assets/editor_numbered_list.svg';
import BulletedListSvg from 'assets/editor_bulleted_list.svg';
import CodeSvg from 'assets/code.svg';
import UploadImg from 'assets/backup-24px.svg';
import ManagerListSvg from 'assets/manager-list.svg';
import ParticipantListSvg from 'assets/participant_list.svg';
import ImageSvg from 'assets/insert_photo-24px.svg';
import { useTranslation } from 'react-i18next';

const DrawerContent = styled.div`
  margin: 0;
`;

type EditorButtonTypes = {
  addInNewLine?: boolean;
  disabledEmbedElements?: ('upload-asset' | 'manager-list' | 'participant-list')[];
};

const EditorButtons = memo(({ addInNewLine = false, disabledEmbedElements = [] }: EditorButtonTypes) => {
  const suffix = addInNewLine ? '-newLine' : '';
  const { t } = useTranslation();

  return (
    <DrawerContent>
      <BlockButton
        className={`ql-header${suffix}`}
        title={t('CREATION_STEP_3_ELEMENT_1')}
        svgLink={TextSvg}
        value={3}
      />
      <BlockButton
        className={`ql-header${suffix}`}
        title={t('CREATION_STEP_3_ELEMENT_2')}
        svgLink={Heading1}
        value={1}
      />
      <BlockButton
        className={`ql-header${suffix}`}
        title={t('CREATION_STEP_3_ELEMENT_3')}
        svgLink={Heading2}
        value={2}
      />
      <BlockButton className={`ql-blockquote${suffix}`} title={t('CREATION_STEP_3_ELEMENT_4')} svgLink={QuoteSvg} />
      <BlockButton className={`ql-code-block${suffix}`} title={t('CREATION_STEP_3_ELEMENT_5')} svgLink={CodeSvg} />
      <BlockButton
        className={`ql-list${suffix}`}
        title={t('CREATION_STEP_3_ELEMENT_6')}
        svgLink={NumberedListSvg}
        value="ordered"
      />
      <BlockButton
        className={`ql-list${suffix}`}
        title={t('CREATION_STEP_3_ELEMENT_7')}
        svgLink={BulletedListSvg}
        value="bullet"
      />
      <BlockButton className="ql-video" title={t('QUILL_VIDEO')} />
      <BlockButton className="ql-image" title={t('CREATION_STEP_3_ELEMENT_8')} svgLink={ImageSvg} />
      <BlockButton
        className="ql-upload-asset"
        title={t('CREATION_STEP_3_ELEMENT_10')}
        svgLink={UploadImg}
        value="true"
      />
      {!disabledEmbedElements.includes('manager-list') && (
        <BlockButton
          className="ql-manager-list"
          title={t('CREATION_STEP_3_ELEMENT_11')}
          svgLink={ManagerListSvg}
          value="true"
        />
      )}
      {!disabledEmbedElements.includes('participant-list') && (
        <BlockButton
          className="ql-participant-list"
          title={t('CREATION_STEP_3_ELEMENT_12')}
          svgLink={ParticipantListSvg}
          value="true"
        />
      )}
    </DrawerContent>
  );
});

EditorButtons.displayName = 'editor-buttons';

export default EditorButtons;
