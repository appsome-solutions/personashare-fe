import React, { FunctionComponent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { TopNav } from 'components/TopNav/TopNav';
import LogoSvg from 'assets/logo.svg';
import { Formik, Form } from 'formik';
import { object, string, InferType } from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { useFirebase } from 'global/Firebase';
import { SIGN_IN, SignInResponse } from 'global/graphqls/SignIn';
import { PS_TOKEN_NAME } from 'global/ApolloClient/ApolloClient';
import { Button } from 'components/Button';
import { InputWithSuffixIcon } from 'components/InputWithSuffixIcon/InputWithSuffixIcon';
import { PasswordInput } from 'components/PasswordInput';
import { Card } from 'components/Card/Card';
import { Link } from 'react-router-dom';
import { PageWrapper } from 'components/PageWrapper/PageWrapper';
// TODO: Remove after real integration
import { useUserContext } from 'global/UserContext/UserContext';
import EmailIconSvg from 'assets/email.svg';
import { APP_ROUTES } from 'global/AppRouter/routes';
import { signInWithGoogle } from 'helpers/signInWithGoogle';

const Caption = styled.span(props => props.theme.typography.caption);

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
`;

const LoginText = styled.h5`
  margin-bottom: 20px;
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

const StyledErrorMessage = styled.div`
  color: ${props => props.theme.colors.functional.error};
`;

const validationSchema = object({
  email: string().email(),
  password: string().required('Password is required'),
});

type FormValues = InferType<typeof validationSchema>;

const initialValues: FormValues = {
  email: '',
  password: '',
};

export const Login: FunctionComponent = () => {
  const [apiError, setApiError] = useState('');
  const { setUser } = useUserContext();
  const firebase = useFirebase();
  const [signIn, { data }] = useMutation<SignInResponse>(SIGN_IN);
  const history = useHistory();

  if (!firebase) {
    return null;
  }

  const handleBEConnection = async (idToken: string): Promise<void> => {
    const data = await signIn({ variables: { idToken } });
    const token = data?.data?.loginUser.accessToken || '';
    const defaultPersonaConst = data?.data?.loginUser.user.defaultPersona;

    if (token && !defaultPersonaConst) {
      localStorage.setItem(PS_TOKEN_NAME, token);
      setUser(data?.data?.loginUser?.user || null);
      history.push(APP_ROUTES.PERSONA_CREATION_STEP_1);
    } else if (token && defaultPersonaConst) {
      localStorage.setItem(PS_TOKEN_NAME, token);
      setUser(data?.data?.loginUser?.user || null);
      history.push(APP_ROUTES.SCANNER);
    }
  };

  const handleGoogleLogin = async (): Promise<void> => {
    const idToken = await signInWithGoogle(firebase);

    if (idToken) {
      handleBEConnection(idToken);
    }
  };

  const handleLogin = async ({ email, password }: FormValues): Promise<void> => {
    try {
      await firebase.auth.signInWithEmailAndPassword(email, password);
      const idToken = await firebase?.getCurrentUser()?.getIdToken();

      if (idToken) {
        handleBEConnection(idToken);
      }
    } catch (error) {
      setApiError(error.message);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleLogin} validationSchema={validationSchema}>
      {() => (
        <Form>
          <div>
            <TopNav isWithBackArrow />
            <PageWrapper>
              <StyledLogo src={LogoSvg} alt="logo" />
              <StyledCard>
                <HeyText>Hey!</HeyText>
                <LoginText>Sign into your Account</LoginText>
                <InputWithSuffixIcon name="email" placeholder="Email" svgLink={EmailIconSvg} />
                <StyledPasswordInput name="password" placeholder="Password" />
                <StyledErrorMessage>{apiError}</StyledErrorMessage>
                <ResetPassword>
                  Forgot your <Link to={APP_ROUTES.RESET_PASSWORD}>Password?</Link>
                </ResetPassword>
                <LoginButton block htmlType="submit">
                  LOGIN
                </LoginButton>
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
                Don’t have account? <Link to={APP_ROUTES.REGISTER}>Register Now</Link>
              </RegisterCaption>
            </PageWrapper>
          </div>
        </Form>
      )}
    </Formik>
  );
};
