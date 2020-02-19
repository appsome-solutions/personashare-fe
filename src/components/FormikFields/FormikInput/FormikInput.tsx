import React, { ChangeEvent, ReactElement } from 'react';
import { Field } from 'formik';
import get from 'lodash/get';
import { Input, Props as InputProps } from 'components/Input';
import { setFieldValueAndTouched } from '../helpers';
import { withErrorMessage } from '../withErrorMessage';
import { InterfaceInputComponent } from '../types';

export type FormikInputProps = InterfaceInputComponent & InputProps;

const CustomInputComponent = (props: FormikInputProps): ReactElement<FormikInputProps> => {
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

const FormikInput = React.memo<InputProps>((props: InputProps) => (
  <Field {...props}>
    {(fieldProps: any) => withErrorMessage<FormikInputProps>(CustomInputComponent)({ ...props, ...fieldProps })}
  </Field>
));

FormikInput.displayName = 'FormikInput';

export default FormikInput;
