import { FormikHelpers as FormikActions } from 'formik';

export const setFieldValueAndTouched = (fieldName: string, value: any, form: FormikActions<any>): void => {
  form.setFieldTouched(fieldName, true);
  form.setFieldValue(fieldName, value);
};
