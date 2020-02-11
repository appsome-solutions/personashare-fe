/* eslint-disable react/display-name */
import React from 'react';
import { Field, FieldProps } from 'formik';
import get from 'lodash/get';
import { Checkbox } from 'components/Checkbox';
import { setFieldValueAndTouched } from '../helpers';
import { withErrorMessage } from '../withErrorMessage';
import { CheckboxProps, CheckboxChangeEvent } from 'antd/lib/checkbox';

type FormikCheckboxProps = CheckboxProps & FieldProps;

const CustomInputComponent = (props: FormikCheckboxProps) => {
  const { field, form, value, onChange, ...fieldProps } = props;
  const inputValue = value || get(form.values, field.name);
  return (
    <Checkbox
      name={field.name}
      checked={inputValue}
      onChange={(event: CheckboxChangeEvent) => {
        setFieldValueAndTouched(field.name, event.target.checked, form);
        onChange && onChange(event);
      }}
      {...fieldProps}
      {...props}
    />
  );
};

export default React.memo<CheckboxProps>((props: CheckboxProps) => (
  <Field {...props}>{(fieldProps: any) => withErrorMessage(CustomInputComponent)({ ...props, ...fieldProps })}</Field>
));
