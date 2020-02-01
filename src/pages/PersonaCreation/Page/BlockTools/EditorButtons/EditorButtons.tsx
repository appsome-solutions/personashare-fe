import React from 'react';

import { BlockButton } from '../BlockButton/BlockButton';
import TextSvg from 'assets/editor_text.svg';
import Heading1 from 'assets/editor_heading1.svg';
import Heading2 from 'assets/editor_heading2.svg';
import Heading3 from 'assets/editor_heading3.svg';
import QuoteSvg from 'assets/editor_quote.svg';
import NumberedListSvg from 'assets/editor_numbered_list.svg';
import BulletedListSvg from 'assets/editor_bulleted_list.svg';
import styled from 'styled-components';

const DrawerContent = styled.div`
  margin: 16px 0;
`;

export const EditorButtons = () => (
  <DrawerContent>
    <BlockButton title="Text" svgLink={TextSvg} format="paragraph" />
    <BlockButton title="Heading 1" svgLink={Heading1} format="heading-one" />
    <BlockButton title="Heading 2" svgLink={Heading2} format="heading-two" />
    <BlockButton title="Heading 3" svgLink={Heading3} format="heading-three" />
    <BlockButton title="Quote" svgLink={QuoteSvg} format="block-quote" />
    <BlockButton title="Numbered list" svgLink={NumberedListSvg} format="numbered-list" />
    <BlockButton title="Bulleted list" svgLink={BulletedListSvg} format="bulleted-list" />
  </DrawerContent>
);
