import styled from 'styled-components';
import { Flex } from '../FlexBox/FlexBox';
import { FlexboxProps } from 'styled-system';

export const PageWrapper = styled(Flex)<FlexboxProps>`
  justify-content: ${(props) => props.justifyContent || 'center'};
  flex-direction: ${(props) => props.flexDirection || 'column'};
  padding: 0 16px;
  background-color: ${(props) => props.theme.colors.utils.background.mid};
  overflow: auto;
  min-height: ${(props) => props.theme.contentHeight};
  margin-bottom: auto;
`;
