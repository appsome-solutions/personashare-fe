import React, { FunctionComponent, useState } from 'react';
import { notification } from 'antd';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { TopNav } from 'components/TopNav/TopNav';
import LogoSvg from 'assets/logo_nobg.svg';
import { Formik, Form } from 'formik';
import { object, string, InferType } from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { useFirebase } from 'global/Firebase';
import { SIGN_IN, SignInResponse } from 'global/graphqls/SignIn';
import { Button } from 'components/Button';
import { InputWithSuffixIcon } from 'components/InputWithSuffixIcon/InputWithSuffixIcon';
import { PasswordInput } from 'components/PasswordInput';
import { Card } from 'components/Card/Card';
import { Link } from 'react-router-dom';
import { PageWrapper } from 'components/PageWrapper/PageWrapper';
import { useUserContext } from 'global/UserContext/UserContext';
import EmailIconSvg from 'assets/email.svg';
import { APP_ROUTES } from 'global/AppRouter/routes';
import { signInWithGoogle } from 'helpers/signInWithGoogle';
import { GET_USER } from 'global/graphqls/User';
import { client } from 'global/ApolloClient/ApolloClient';
import { Spinner } from 'components/Spinner/Spinner';
import { getUrlsParams } from '../../helpers/URLParams';
import { ActionType } from '../Action/Action';
import { useTranslation } from 'react-i18next';
import { useApiErrorsTranslation } from 'global/Firebase/ApiErrorsTranslations/ApiErrorsTranslations';

const Caption = styled.span((props) => props.theme.typography.caption);

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

const LoginText = styled.h6`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GoogleButton = styled(Button)`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e62b33;
    &&:active,
    &&:hover {
      color: ${(props) => props.theme.colors.utils.text.light};
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
  color: ${(props) => props.theme.colors.functional.error};
`;

export const Login: FunctionComponent = () => {
  const { t } = useTranslation();
  const [apiError, setApiError] = useState('');
  const [verified, setVerified] = useState(false);
  const { setUser } = useUserContext();
  const firebase = useFirebase();
  const [signIn, { loading }] = useMutation<SignInResponse>(SIGN_IN);
  const history = useHistory();
  const { getErrorMessage } = useApiErrorsTranslation();
  const { actionCode, action } = getUrlsParams(['actionCode', 'action']);

  if (loading) {
    return <Spinner />;
  }

  const validationSchema = object({
    email: string().email(),
    password: string().required(`${t('PASSWORD_IS_REQUIRED')}`),
  });

  type FormValues = InferType<typeof validationSchema>;

  const initialValues: FormValues = {
    email: '',
    password: '',
  };

  if (!firebase) {
    return null;
  }

  const handleBEConnection = async (idToken: string): Promise<void> => {
    const data = await signIn({ variables: { idToken } });
    const loggedUSer = data?.data?.loginUser.user || null;
    const defaultPersonaConst = data?.data?.loginUser.user.defaultPersona;
    setUser(loggedUSer);

    client.writeQuery({
      query: GET_USER,
      data: { user: data?.data?.loginUser.user },
    });

    if (loggedUSer && !defaultPersonaConst) {
      history.push(APP_ROUTES.PERSONA_CREATION_STEP_1);
    } else if (loggedUSer && defaultPersonaConst) {
      history.push(APP_ROUTES.SCANNER);
    }
  };

  const handleGoogleLogin = async (): Promise<void> => {
    const idToken = await signInWithGoogle(firebase);

    if (idToken) {
      handleBEConnection(idToken);
    }
  };

  const errorMessage = (error: any) => {
    if (error.code) {
      return setApiError(getErrorMessage(error.code));
    }

    if (error.message.includes('There is no user record ')) {
      return setApiError(
        error.message + ` There is no such a user in our database or an account hasn't been activated yet.`
      );
    } else {
      return setApiError(error.message);
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
      errorMessage(error);
    }
  };

  if ((action as ActionType) === 'verify' && !verified) {
    firebase
      .applyActionCode(actionCode)
      .then(async () => {
        setVerified(true);
        notification.success({
          duration: 3,
          message: `${t('EMAIL_CONFIRM_MESSAGE')}`,
          description: `${t('EMAIL_CONFIRM_DESCRIPTION')}`,
        });

        const idToken = await firebase?.getCurrentUser()?.getIdToken();

        if (idToken) {
          handleBEConnection(idToken);
        }
      })
      .catch(() => {
        notification.error({
          duration: 3,
          message: `${t('EMAIL_CANT_CONFIRM_MESSAGE')}`,
          description: `${t('EMAIL_CANT_CONFIRM_DESCRIPTION')}`,
        });
      });
  }

  if ((action as ActionType) === 'verificationEmailSent') {
    notification.info({
      duration: 4.5,
      message: `${t('EMAIL_ON_EMAIL_CONFIRM_MESSAGE')}`,
      description: `${t('EMAIL_ON_EMAIL_CANT_CONFIRM_DESCRIPTION')}`,
    });
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleLogin} validationSchema={validationSchema}>
      {() => (
        <Form>
          <div>
            <TopNav isWithBackArrow />
            <PageWrapper>
              <StyledLogo src={LogoSvg} alt="logo" />
              <StyledCard>
                <HeyText>{t('LOGIN_HEADING_1')}</HeyText>
                <LoginText>{t('LOGIN_HEADING_2')}</LoginText>
                <InputWithSuffixIcon name="email" placeholder={t('LOGIN_EMAIL_INPUT')} svgLink={EmailIconSvg} />
                <StyledPasswordInput name="password" placeholder={t('LOGIN_FORGOT_PASSWORD')} />
                <StyledErrorMessage>{apiError}</StyledErrorMessage>
                <ResetPassword>
                  {t('LOGIN_PASSWORD_INPUT')} <Link to={APP_ROUTES.RESET_PASSWORD}>{t('LOGIN_RESET_PASSWORD')}</Link>
                </ResetPassword>
                <LoginButton block htmlType="submit">
                  {t('LOGIN_BUTTON')}
                </LoginButton>
                <OrLoginCaption>{t('LOGIN_TEXT_BETWEEN_BUTTON')}</OrLoginCaption>
                <GoogleButton block onClick={handleGoogleLogin}>
                  {t('LOGIN_GOOGLE')}
                </GoogleButton>
              </StyledCard>
              <RegisterCaption>
                {t('LOGIN_NO_ACCOUNT')} <Link to={APP_ROUTES.REGISTER}> {t('LOGIN_NO_ACCOUNT_REGISTER')}</Link>
              </RegisterCaption>
            </PageWrapper>
          </div>
        </Form>
      )}
    </Formik>
  );
};
