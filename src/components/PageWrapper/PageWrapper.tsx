import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 16px;
  background-color: ${props => props.theme.colors.utils.background.mid};
  min-height: calc(100vh - 108px);
`;
