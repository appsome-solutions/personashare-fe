import React from 'react';
import styled from 'styled-components';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Icon as IconComponent } from 'components/Icon';
import EmailIconSvg from 'assets/email.svg';
import { Checkbox } from 'components/Checkbox';
import { PasswordInput } from 'components/PasswordInput';

const RedButton = styled(Button)`
  && {
    background-color: #e62b33;
    &&:active,
    &&:hover {
      color: ${props => props.theme.colors.utils.text.light};
      background-color: #e62b33;
    }
  }
`;

const Icon = styled(IconComponent)`
  background-color: ${props => props.theme.colors.utils.border.mid};
`;

export const Login = () => {
  return (
    <div>
      <Button>AAAA</Button>
      <RedButton>AAAA</RedButton>
      <Input suffix={<Icon svgLink={EmailIconSvg} />} />
      <Checkbox />
      <PasswordInput />
    </div>
  );
};
