import React from 'react';
import styled from 'styled-components';
import { Input } from 'components/Input';
import EmailIconSvg from 'assets/email.svg';
import { Icon } from 'components/Icon';

const EmailIcon = styled(Icon)`
  background-color: ${props => props.theme.colors.utils.border.mid};
`;

export const EmailInput = () => <Input suffix={<EmailIcon svgLink={EmailIconSvg} />} />;
