import React, { ReactElement } from 'react';
import { ErrorMessage, FieldProps } from 'formik';
import styled from 'styled-components';

type fieldComponent<P> = (props: P) => ReactElement<P>;

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

export function withErrorMessage<P extends FieldProps>(FieldComponent: fieldComponent<P> | any) {
  // eslint-disable-next-line react/display-name
  return (props: P) => (
    <WithErrorMessageContainer>
      <FieldComponent
        {...props}
        isValid={props.form.touched[props.field.name] && !props.form.errors[props.field.name]}
      />
      <ErrorMessage name={props.field.name}>{msg => <ErrorText>{msg}</ErrorText>}</ErrorMessage>
    </WithErrorMessageContainer>
  );
}
