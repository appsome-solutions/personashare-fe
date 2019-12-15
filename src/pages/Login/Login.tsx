import React from 'react';
import styled from 'styled-components';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Icon } from 'components/Icon';
import EmailIconSvg from 'assets/email.svg';
import { Checkbox } from 'components/Checkbox';

const RedButton = styled(Button)`
  && {
    background-color: #e62b33;
  }
`;

const EmailIcon = styled(Icon)`
  background-color: ${props => props.theme.colors.utils.border.mid};
`;

export const Login = () => {
  return (
    <div>
      <Button>AAAA</Button>
      <RedButton>AAAA</RedButton>
      <Input suffix={<EmailIcon svgLink={EmailIconSvg} />} />
      <Checkbox />
    </div>
  );
};
