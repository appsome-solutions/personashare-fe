/* eslint-disable react/display-name */
import React from 'react';

import { BlockButton } from './BlockButton';
import TextSvg from 'assets/editor_text.svg';
import Heading1 from 'assets/editor_heading1.svg';
import Heading2 from 'assets/editor_heading2.svg';
import QuoteSvg from 'assets/editor_quote.svg';
import NumberedListSvg from 'assets/editor_numbered_list.svg';
import BulletedListSvg from 'assets/editor_bulleted_list.svg';
import styled from 'styled-components';

const DrawerContent = styled.div`
  margin: 16px 0;
`;

type EditorButtonTypes = {
  addInNewLine?: boolean;
};

export const EditorButtons = React.memo(({ addInNewLine = false }: EditorButtonTypes) => {
  const suffix = addInNewLine ? '-newLine' : '';
  return (
    <DrawerContent>
      <BlockButton className={`ql-header${suffix}`} title="Text" svgLink={TextSvg} value={3} />
      <BlockButton className={`ql-header${suffix}`} title="Heading 1" svgLink={Heading1} value={1} />
      <BlockButton className={`ql-header${suffix}`} title="Heading 2" svgLink={Heading2} value={2} />
      <BlockButton className={`ql-blockquote${suffix}`} title="Quote" svgLink={QuoteSvg} />
      <BlockButton className={`ql-list${suffix}`} title="Numbered list" svgLink={NumberedListSvg} value="ordered" />
      <BlockButton className={`ql-list${suffix}`} title="Bulleted list" svgLink={BulletedListSvg} value="bullet" />
    </DrawerContent>
  );
});
