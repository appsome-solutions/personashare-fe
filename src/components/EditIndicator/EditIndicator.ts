import styled from 'styled-components';
import EditIcon from 'assets/edit_icon.svg';

export const EditIndicator = styled.img.attrs(() => ({
  src: EditIcon,
}))`
  width: 42px;
  height: 42px;
`;
