import React from 'react';
import styled from 'styled-components';
import EmailIconSvg from 'assets/email.svg';
import { Icon } from 'components/Icon';
import { InputProps } from 'antd/lib/input';
import FormikInput from 'components/FormikFields/FormikInput/FormikInput';

const EmailIcon = styled(Icon)`
  background-color: ${props => props.theme.colors.utils.border.mid};
`;

export const EmailInput = (props: InputProps) => (
  <FormikInput {...props} suffix={<EmailIcon svgLink={EmailIconSvg} />} />
);
