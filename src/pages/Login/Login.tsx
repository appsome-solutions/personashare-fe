import React from 'react';
import styled from 'styled-components';
import { Button } from 'components/Button';

const RedButton = styled(Button)`
  && {
    background-color: #e62b33;
  }
`;

export const Login = () => {
  return (
    <div>
      <Button>AAAA</Button>
      <RedButton>AAAA</RedButton>
    </div>
  );
};
