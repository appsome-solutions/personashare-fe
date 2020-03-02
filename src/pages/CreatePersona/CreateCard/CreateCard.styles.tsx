import React, { FC } from 'react';
import styled from 'styled-components';
import { Input as AntInput } from 'antd';

import { InputProps } from 'antd/lib/input/Input';

type CardInputProps = InputProps & {
  hasError: boolean;
};

const CardInput = styled(AntInput)`
  text-align: center;
  background-color: ${props => props.theme.colors.utils.background.light};
`;

export const CardName = styled<FC<CardInputProps>>(({ hasError, ...restProps }) => <CardInput {...restProps} />)`
  ${props => props.theme.typography.subtitle2};
  border: ${props => (props.hasError ? `1px solid ${props.theme.colors.functional.error}` : 0)};
`;

export const CardDescription = styled<FC<CardInputProps>>(({ hasError, ...restProps }) => <CardInput {...restProps} />)`
  ${props => props.theme.typography.body2};
  border: ${props => (props.hasError ? `1px solid ${props.theme.colors.functional.error}` : 0)};
  margin-top: 23px;
  margin-bottom: 34px;
`;

export const CardBody = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 16px;
`;
