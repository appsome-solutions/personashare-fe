import React from 'react';
import styled from 'styled-components';
import AddSvg from 'assets/add-24px.svg';
import { DrawerPage } from 'components/DrawerPage/DrawerPage';
import { EditorButtons } from './EditorButtons/EditorButtons';
import { useEditorContext } from '../EditorContext';
import { BarIcon, EditorBarWrapper } from '../EditorStyles';

const Separator = styled.div`
  width: 1px;
  height: 36px;
  background-color: ${(props) => props.theme.colors.functional.disabled};
`;

const TurnInto = styled.span`
  margin-left: 8px;
`;

export const BlockTools = () => {
  const { areEditorButtonsVisible, setAreEditorButtonsVisible } = useEditorContext();

  return (
    <EditorBarWrapper>
      <DrawerPage
        isVisible={areEditorButtonsVisible}
        OnClickComponent={() => <BarIcon svgLink={AddSvg} onClick={() => setAreEditorButtonsVisible(true)} />}
        onClose={() => setAreEditorButtonsVisible(false)}
        title="Turn Into"
      >
        <EditorButtons addInNewLine />
      </DrawerPage>
      <Separator />
      <DrawerPage
        isVisible={areEditorButtonsVisible}
        OnClickComponent={() => <TurnInto onClick={() => setAreEditorButtonsVisible(true)}>Turn into</TurnInto>}
        onClose={() => setAreEditorButtonsVisible(false)}
        title="Turn Into"
      >
        <EditorButtons />
      </DrawerPage>
    </EditorBarWrapper>
  );
};
