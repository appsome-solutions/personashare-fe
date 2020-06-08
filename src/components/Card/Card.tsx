import styled from 'styled-components';
import { Box } from 'components/FlexBox/FlexBox';

export const Card = styled(Box)`
  background-color: ${(props) => props.theme.colors.utils.background.light};
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  margin-bottom: 20px;
`;
