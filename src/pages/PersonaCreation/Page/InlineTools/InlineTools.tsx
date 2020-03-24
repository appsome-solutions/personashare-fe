import React from 'react';
import { useEditorContext } from '../EditorContext';
import { InlineButton } from './InlineButton/InlineButton';

import BoldSvg from 'assets/format_bold.svg';
import ItalicSvg from 'assets/format_italic.svg';
import UnderlineSvg from 'assets/format_underlined.svg';
import CodeSvg from 'assets/code.svg';

import { EditorBarWrapper } from '../EditorStyles';
import styled from 'styled-components';

const StyledEditorBarWrapper = styled(EditorBarWrapper)`
  & > div {
    border-right: 1px solid ${props => props.theme.colors.functional.disabled};
  }
`;

export const InlineTools = () => {
  const { setAreEditorButtonsVisible } = useEditorContext();

  return (
    <StyledEditorBarWrapper onClick={() => setAreEditorButtonsVisible(true)}>
      <InlineButton format="bold" svgLink={BoldSvg} />
      <InlineButton format="code" svgLink={CodeSvg} />
      <InlineButton format="italic" svgLink={ItalicSvg} />
      <InlineButton format="underline" svgLink={UnderlineSvg} />
    </StyledEditorBarWrapper>
  );
};