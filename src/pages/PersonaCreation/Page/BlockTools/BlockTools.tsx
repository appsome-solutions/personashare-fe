import React from 'react';
import styled from 'styled-components';
import { Icon } from 'components/Icon';
import AddSvg from 'assets/add-24px.svg';
import Heading1 from 'assets/editor_heading1.svg';
import Heading2 from 'assets/editor_heading2.svg';
import Heading3 from 'assets/editor_heading3.svg';
import TextSvg from 'assets/editor_text.svg';
import { DrawerPage } from 'components/DrawerPage/DrawerPage';
import { BlockButton } from './BlockButton/BlockButton';

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

const DrawerContent = styled.div`
  margin: 16px 0;
`;

export const BlockTools = () => {
  return (
    <StyledWrapper>
      <AddIcon svgLink={AddSvg} />
      <Separator />
      <DrawerPage OnClickComponent={() => <TurnInto>Turn into</TurnInto>} title="Turn Into">
        <DrawerContent>
          <BlockButton title="Text" svgLink={TextSvg} format="paragraph" />
          <BlockButton title="Heading 1" svgLink={Heading1} format="heading-one" />
          <BlockButton title="Heading 2" svgLink={Heading2} format="heading-two" />
          <BlockButton title="Heading 3" svgLink={Heading3} format="heading-three" />
        </DrawerContent>
      </DrawerPage>
    </StyledWrapper>
  );
};
