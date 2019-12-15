import styled from 'styled-components';

export const Card = styled.div`
  background-color: ${props => props.theme.colors.utils.background.light};
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
`;
