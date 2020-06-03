import React from 'react';
import styled from 'styled-components';
import { Input as AntInput } from 'antd';
import { InputProps, TextAreaProps } from 'antd/lib/input';

const StyledInput = styled(AntInput)`
  && {
    background: ${(props) => props.theme.colors.utils.background.light};
    border: 1px solid ${(props) => props.theme.colors.utils.border.mid};
    box-sizing: border-box;
    border-radius: 4px;
  }
`;

const PasswordInput = styled(AntInput.Password)`
  && {
    padding-right: 30px;
  }
`;

const StyledTextArea = styled(AntInput.TextArea)`
  && {
    background: ${(props) => props.theme.colors.utils.background.light};
    border: 1px solid ${(props) => props.theme.colors.utils.border.mid};
    box-sizing: border-box;
    border-radius: 4px;
  }
`;

type CommonProps = {
  hasError?: boolean;
  visibilityToggle?: boolean;
  type?: string;
};

export type Props = InputProps & CommonProps;

export type StyledTextAreaProps = TextAreaProps & CommonProps;

export const Input = (props: Props | StyledTextAreaProps) => {
  switch (props.type) {
    case 'password':
      return <PasswordInput {...(props as Props)} />;
    case 'textarea':
      return <StyledTextArea {...(props as StyledTextAreaProps)} />;
    default:
      return <StyledInput {...(props as Props)} />;
  }
};
