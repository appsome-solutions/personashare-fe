import React from 'react';
import styled from 'styled-components';
import { Icon } from 'components/Icon';
import AddSvg from 'assets/add-24px.svg';
import { DrawerPage } from 'components/DrawerPage/DrawerPage';
import { EditorButtons } from './EditorButtons/EditorButtons';

export const StyledWrapper = styled.div`
  height: 36px;
  position: fixed;
  bottom: 50px;
  width: 100%;

  display: flex;
  align-items: center;

  background-color: ${props => props.theme.colors.utils.background.light};
  border-top: 1px solid ${props => props.theme.colors.functional.disabled};
`;

const AddIcon = styled(Icon)`
  height: 36px;
  width: 36px;
`;

const Separator = styled.div`
  width: 1px;
  height: 36px;
  background-color: ${props => props.theme.colors.functional.disabled};
`;

const TurnInto = styled.span`
  margin-left: 8px;
`;

export const BlockTools = () => {
  return (
    <StyledWrapper>
      <DrawerPage OnClickComponent={() => <AddIcon svgLink={AddSvg} />} title="Turn Into">
        <EditorButtons addInNewLine />
      </DrawerPage>
      <Separator />
      <DrawerPage OnClickComponent={() => <TurnInto>Turn into</TurnInto>} title="Turn Into">
        <EditorButtons />
      </DrawerPage>
    </StyledWrapper>
  );
};
