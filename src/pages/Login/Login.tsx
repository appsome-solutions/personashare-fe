import React from 'react';
import styled from 'styled-components';
import { Button } from 'components/Button';
import { Checkbox } from 'components/Checkbox';
import { EmailInput } from 'components/EmailInput/EmailInput';
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

export const Login = () => {
  return (
    <div>
      <Button>AAAA</Button>
      <RedButton>AAAA</RedButton>
      <EmailInput />
      <Checkbox />
      <PasswordInput />
    </div>
  );
};
