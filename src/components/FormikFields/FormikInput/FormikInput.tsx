/* eslint-disable react/display-name */
import React, { ChangeEvent } from 'react';
import { Field, FieldProps } from 'formik';
import get from 'lodash/get';
import { Input, Props as InputProps } from 'components/Input';
import { setFieldValueAndTouched } from '../helpers';
import { withErrorMessage } from '../withErrorMessage';
import { InterfaceInputComponent } from '../types';

type FormikInputProps = InterfaceInputComponent & InputProps;

const CustomInputComponent = (props: FormikInputProps) => {
  const { field, form, value, isValid = true, onChange, ...fieldProps } = props;
  const inputValue = value || get(form.values, field.name);
  return (
    <Input
      name={field.name}
      hasError={!isValid}
      value={inputValue}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        setFieldValueAndTouched(field.name, event.target.value, form);
        onChange && onChange(event);
      }}
      {...fieldProps}
    />
  );
};

export default React.memo<InputProps>((props: InputProps) => (
  <Field {...props}>
    {(fieldProps: FieldProps) => withErrorMessage(CustomInputComponent)({ ...props, ...fieldProps })}
  </Field>
));
