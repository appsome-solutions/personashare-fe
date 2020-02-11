import React from 'react';
import styled from 'styled-components';
import { Input as AntInput } from 'antd';
import { InputProps } from 'antd/lib/input';

const StyledInput = styled(AntInput)`
  && {
    background: ${props => props.theme.colors.utils.background.light};
    border: 1px solid ${props => props.theme.colors.utils.border.mid};
    box-sizing: border-box;
    border-radius: 4px;
  }
`;

const PasswordInput = styled(AntInput.Password)`
  && {
    padding-right: 30px;
  }
`;

export type Props = InputProps & {
  hasError?: boolean;
  visibilityToggle?: boolean;
};

export const Input = (props: Props) => {
  const InputComponent = props.type === 'password' ? PasswordInput : StyledInput;
  return <InputComponent {...props} />;
};
