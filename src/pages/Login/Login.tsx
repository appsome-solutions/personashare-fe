import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { TopNav } from 'components/TopNav/TopNav';
import LogoSvg from 'assets/logo.svg';
import { useMutation } from '@apollo/react-hooks';
import { Firebase, useFirebase } from 'global/Firebase';
import { SIGN_IN, SignInResponse } from 'global/graphqls/SignIn';
import { PS_TOKEN_NAME } from 'global/ApolloClient/ApolloClient';
import { Button } from 'components/Button';
import { EmailInput } from 'components/EmailInput/EmailInput';
import { PasswordInput } from 'components/PasswordInput';
import { Card } from 'components/Card/Card';
import { Link } from 'react-router-dom';

const Caption = styled.span(props => props.theme.typography.caption);

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 16px;
  background-color: ${props => props.theme.colors.utils.background.mid};
  min-height: calc(100vh - 108px);
`;

const StyledLogo = styled.img`
  margin-top: 46px;
  margin-bottom: 36px;
`;

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 27px 24px 34px;
`;

const HeyText = styled.h4`
  margin-bottom: 0;
  color: ${props => props.theme.colors.utils.text.dark};
`;

const LoginText = styled.h5`
  margin-bottom: 20px;
  color: ${props => props.theme.colors.utils.text.dark};
`;

const StyledPasswordInput = styled(PasswordInput)`
  margin-top: 20px;
`;

const ResetPassword = styled(Caption)`
  margin-top: 20px;
  align-self: flex-end;
`;

const LoginButton = styled(Button)`
  margin-top: 28px;
`;

const GoogleButton = styled(Button)`
  && {
    background-color: #e62b33;
    &&:active,
    &&:hover {
      color: ${props => props.theme.colors.utils.text.light};
      background-color: #e62b33;
    }
  }
`;

const OrLoginCaption = styled(Caption)`
  margin: 18px 0;
`;

const RegisterCaption = styled(Caption)`
  text-align: center;
  margin-top: 32px;
  margin-bottom: 24px;
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

  const handleGoogleLogin = async (): Promise<void> => {
    const idToken = await signInWithGoogle(firebase);

    if (idToken) {
      const data = await signIn({ variables: { idToken } });
      const token = data?.data?.loginUser.accessToken || '';

      if (token) {
        localStorage.setItem(PS_TOKEN_NAME, token);
      }
    }
  };

  return (
    <div>
      <TopNav isWithBackArrow />
      <PageWrapper>
        <StyledLogo src={LogoSvg} alt="logo" />
        <StyledCard>
          <HeyText>Hey!</HeyText>
          <LoginText>Sign into your Account</LoginText>
          <EmailInput placeholder="Email" />
          <StyledPasswordInput placeholder="Password" />
          <ResetPassword>
            Forgot your <Link to="/reset-password">Password?</Link>
          </ResetPassword>
          <LoginButton block>LOGIN</LoginButton>
          <OrLoginCaption>Or Login using social Media</OrLoginCaption>
          <GoogleButton block onClick={handleGoogleLogin}>
            GOOGLE
          </GoogleButton>
          {data?.loginUser && (
            <div>
              <div>Access Token</div>
              <div>{data?.loginUser?.accessToken}</div>
            </div>
          )}
        </StyledCard>
        <RegisterCaption>
          Don’t have account? <Link to="/register">Register Now</Link>
        </RegisterCaption>
      </PageWrapper>
    </div>
  );
};
