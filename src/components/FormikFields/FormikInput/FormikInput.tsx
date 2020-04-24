import React, { ChangeEvent, ReactElement } from 'react';
import { Field } from 'formik';
import get from 'lodash/get';
import { Input, Props as InputProps, StyledTextAreaProps } from 'components/Input';
import { setFieldValueAndTouched } from '../helpers';
import { withErrorMessage } from '../withErrorMessage';
import { InterfaceInputComponent } from '../types';

export type FormikInputProps = InterfaceInputComponent & InputProps;

export type FormikTextAreaProps = InterfaceInputComponent & StyledTextAreaProps;

type CustomInputComponentProps = FormikInputProps | FormikTextAreaProps;

const CustomInputComponent = (props: CustomInputComponentProps): ReactElement<CustomInputComponentProps> => {
  const { field, form, value, isValid = true, onChange, type, ...fieldProps } = props;
  const inputValue = value || get(form.values, field.name);
  return (
    <Input
      name={field.name}
      hasError={!isValid}
      value={inputValue}
      onChange={(event: ChangeEvent<any>) => {
        setFieldValueAndTouched(field.name, event.target.value, form);
        onChange && onChange(event);
      }}
      type={type}
      {...fieldProps}
    />
  );
};

const FormikInput = React.memo<InputProps>((props: InputProps) => (
  <Field {...props}>
    {(fieldProps: any) => withErrorMessage<FormikInputProps>(CustomInputComponent)({ ...props, ...fieldProps })}
  </Field>
));

FormikInput.displayName = 'FormikInput';

const FormikTextArea = React.memo<StyledTextAreaProps>((props: StyledTextAreaProps) => (
  <Field {...props}>
    {(fieldProps: any) => withErrorMessage<FormikInputProps>(CustomInputComponent)({ ...props, ...fieldProps })}
  </Field>
));

FormikTextArea.displayName = 'FormikTextArea';

export { FormikInput, FormikTextArea };
