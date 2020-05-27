import styled from 'styled-components';
import { Flex } from 'components/FlexBox/FlexBox';

//TODO: Remove after integration with stepper
export const MockedStepper = styled(Flex as any)`
  height: 24px;
  width: 100%;
  margin: 30px 0;
  color: ${(props) => props.theme.colors.utils.text.light};
  background-color: ${(props) => props.theme.colors.main.primary};
`;
