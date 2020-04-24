import React, { FC } from 'react';
import { InputProps } from 'antd/lib/input';
import { FormikInput } from 'components/FormikFields/FormikInput/FormikInput';
import { InputIcon } from '../InputIcon/InputIcon';

type InputWithSuffixIconProps = InputProps & {
  svgLink: string;
};

export const InputWithSuffixIcon: FC<InputWithSuffixIconProps> = ({ svgLink, ...restPros }) => (
  <FormikInput suffix={<InputIcon svgLink={svgLink} />} {...restPros} />
);
