import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.functional.disabled};
  opacity: 0.75;
  z-index: 100;
`;
