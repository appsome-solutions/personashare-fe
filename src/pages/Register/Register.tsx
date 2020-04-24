import React, { useState, FC } from 'react';
import { object, string, ref, boolean, InferType } from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { TopNav } from 'components/TopNav/TopNav';
import LogoSvg from 'assets/logo.svg';
import styled from 'styled-components';
import { Card } from 'components/Card/Card';
import { InputWithSuffixIcon } from 'components/InputWithSuffixIcon/InputWithSuffixIcon';
import { Link } from 'react-router-dom';
import { Button } from 'components/Button';
import { PasswordInput } from 'components/PasswordInput';
import { PageWrapper } from 'components/PageWrapper/PageWrapper';
import { useFirebase } from 'global/Firebase';
import { SIGN_IN, SignInResponse } from 'global/graphqls/SignIn';
import { PS_TOKEN_NAME } from 'global/ApolloClient/ApolloClient';
import { useUserContext } from 'global/UserContext/UserContext';
import { APP_ROUTES } from 'global/AppRouter/routes';
import FormikCheckbox from 'components/FormikFields/FormikChecbox/FormikCheckbox';
import { signInWithGoogle } from '../../helpers/signInWithGoogle';

import EmailIconSvg from 'assets/email.svg';

const StyledLogo = styled.img`
  margin-top: 46px;
  margin-bottom: 36px;
`;

const CreateAccountText = styled.h5`
  margin-bottom: 20px;
  color: ${props => props.theme.colors.utils.text.dark};
`;

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 27px 24px 34px;
`;

const Caption = styled.span(props => props.theme.typography.caption);

const StyledCheckbox = styled(FormikCheckbox)`
  align-self: start;
  margin-top: 24px;
`;

const RegisterButton = styled(Button)`
  margin-top: 28px;
`;

// Specific color for this specific button:
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

const OrRegisterCaption = styled(Caption)`
  margin: 18px 0;
`;

const LogInCaption = styled(Caption)`
  text-align: center;
  margin-top: 32px;
  margin-bottom: 24px;
`;

const StyledPasswordInput = styled(PasswordInput)`
  margin-top: 20px;
`;

const StyledErrorMessage = styled.div`
  color: ${props => props.theme.colors.functional.error};
`;

const validationSchema = object({
  email: string().email(),
  password: string().required('Password is required'),
  repeatPassword: string()
    .oneOf([ref('password'), null], "Passwords don't match")
    .required('Password confirm is required'),
  termsAccepted: boolean()
    .required('The terms and conditions must be accepted.')
    .oneOf([true], 'The terms and conditions must be accepted.'),
});

type FormValues = InferType<typeof validationSchema>;

const initialValues: FormValues = {
  email: '',
  password: '',
  repeatPassword: '',
  termsAccepted: false,
};

const LinkStyle = styled(Link)`
  margin-right: 2px;
`;

const LinkStyleLeft = styled(Link)`
  margin-left: 2px;
`;

export const Register: FC = () => {
  const [apiError, setApiError] = useState('');
  const { setUser } = useUserContext();
  const firebase = useFirebase();
  const [signIn] = useMutation<SignInResponse>(SIGN_IN);
  const history = useHistory();

  const handleRegister = async ({ email, password }: FormValues): Promise<void> => {
    try {
      await firebase.createUserWithEmailAndPassword(email, password);
      const idToken = await firebase?.getCurrentUser()?.getIdToken();
      const data = await signIn({ variables: { idToken } });
      const token = data?.data?.loginUser.accessToken || '';
      if (token) {
        localStorage.setItem(PS_TOKEN_NAME, token);
        setUser(data?.data?.loginUser?.user || null);
        history.push(APP_ROUTES.PERSONA_CREATION_STEP_1);
      }
    } catch (error) {
      setApiError(error.message);
    }
  };

  const handleGoogleLogin = async (): Promise<void> => {
    const idToken = await signInWithGoogle(firebase);

    if (idToken) {
      const data = await signIn({ variables: { idToken } });
      const token = data?.data?.loginUser.accessToken || '';

      if (token) {
        localStorage.setItem(PS_TOKEN_NAME, token);
        setUser(data?.data?.loginUser?.user || null);
        history.push(APP_ROUTES.PERSONA_CREATION_STEP_1);
      }
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleRegister} validationSchema={validationSchema}>
      {() => (
        <Form>
          <div>
            <TopNav isWithBackArrow />
            <PageWrapper>
              <StyledLogo src={LogoSvg} alt="logo" />
              <StyledCard>
                <CreateAccountText> Create Account </CreateAccountText>
                <InputWithSuffixIcon name="email" placeholder="Email" svgLink={EmailIconSvg} />
                <StyledPasswordInput name="password" placeholder="Password" />
                <StyledPasswordInput name="repeatPassword" placeholder="Repeat password" />
                <StyledErrorMessage>{apiError}</StyledErrorMessage>
                <StyledCheckbox name="termsAccepted">
                  <Caption>
                    I read and agree to
                    <LinkStyle to="/termsofuse">Terms of use,</LinkStyle>
                    <LinkStyle to="/privacyandcookiespolicy">privacy and cookies policy</LinkStyle>
                    and
                    <LinkStyleLeft to="/informativeclause">informative clause</LinkStyleLeft>
                  </Caption>
                </StyledCheckbox>
                <RegisterButton htmlType="submit" block>
                  REGISTER NOW
                </RegisterButton>
                <OrRegisterCaption>Or Register using social Media</OrRegisterCaption>
                <GoogleButton block onClick={handleGoogleLogin}>
                  GOOGLE
                </GoogleButton>
              </StyledCard>
              <LogInCaption>
                Already have an account? <Link to={APP_ROUTES.LOGIN}>Login</Link>
              </LogInCaption>
            </PageWrapper>
          </div>
        </Form>
      )}
    </Formik>
  );
};
