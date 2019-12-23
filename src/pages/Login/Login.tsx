import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import { Firebase, useFirebase } from 'global/Firebase';
import { SIGN_IN, SignInResponse } from 'global/graphqls/SignIn';
import { PS_TOKEN_NAME } from 'global/ApolloClient/ApolloClient';
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

const signInWithGoogle = async (firebase: Firebase): Promise<string | undefined> => {
  const provider = firebase.googleProvider();
  provider && (await firebase.signIn(provider));
  const user = firebase?.getCurrentUser();

  return user?.getIdToken(true);
};

export const Login: FunctionComponent = () => {
  const firebase = useFirebase();
  const [signIn, { data }] = useMutation<SignInResponse>(SIGN_IN);

  if (!firebase) {
    return null;
  }

  return (
    <div>
      <Button
        onClick={async () => {
          const idToken = await signInWithGoogle(firebase);

          if (idToken) {
            const data = await signIn({ variables: { idToken } });
            const token = data?.data?.loginUser.accessToken || '';

            if (token) {
              localStorage.setItem(PS_TOKEN_NAME, token);
            }
          }
        }}
      >
        Google Sign In
      </Button>
      <RedButton>AAAA</RedButton>
      <Input suffix={<Icon svgLink={EmailIconSvg} />} />
      <Checkbox />
      <PasswordInput />
      {data?.loginUser && (
        <div>
          <div>Access Token</div>
          <div>{data?.loginUser?.accessToken}</div>
        </div>
      )}
    </div>
  );
};
