import React, { ReactElement } from 'react';
import { ErrorMessage } from 'formik';
import styled from 'styled-components';

type fieldComponent = (props: any) => ReactElement<any>;

const WithErrorMessageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ErrorText = styled.div`
  font-size: 12px;
  padding-left: 5px;
  color: ${props => props.theme.colors.functional.error};
`;

export const withErrorMessage = (FieldComponent: fieldComponent) => (props: any) => (
  <WithErrorMessageContainer>
    <FieldComponent {...props} isValid={props.form.touched[props.field.name] && !props.form.errors[props.field.name]} />
    <ErrorMessage name={props.field.name}>{msg => <ErrorText>{msg}</ErrorText>}</ErrorMessage>
  </WithErrorMessageContainer>
);
