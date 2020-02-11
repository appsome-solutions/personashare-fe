import styled from 'styled-components';
import { Input as AntInput } from 'antd';

import EditIcon from 'assets/edit_icon.svg';

type CardInputProps = {
  hasError: boolean;
};

export const CardName = styled(AntInput)<CardInputProps>`
  background-color: ${props => props.theme.colors.utils.background.light};
  text-align: center;
  border: ${props => (props.hasError ? '1px solid #E62B33' : 0)};
  ${props => props.theme.typography.subtitle2}
`;

export const CardDescription = styled(AntInput)<CardInputProps>`
  background-color: ${props => props.theme.colors.utils.background.light};
  margin-top: 23px;
  margin-bottom: 34px;
  border: ${props => (props.hasError ? '1px solid #E62B33' : 0)};
  text-align: center;
  ${props => props.theme.typography.body2}
`;

export const CardBody = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 16px;
`;

export const EditButton = styled.img.attrs(() => ({
  src: EditIcon,
}))`
  width: 42px;
  height: 42px;
`;
