import React, { useState, FC } from 'react';
import { object, string, ref, boolean, InferType } from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { TopNav } from 'components/TopNav/TopNav';
import LogoRegister from 'assets/LogoRegister.svg';
import styled from 'styled-components';
import { Card } from 'components/Card/Card';
import { InputWithSuffixIcon } from 'components/InputWithSuffixIcon/InputWithSuffixIcon';
import { Link } from 'react-router-dom';
import { Button } from 'components/Button';
import { PasswordInput } from 'components/PasswordInput';
import { PageWrapper } from 'components/PageWrapper/PageWrapper';
import { useFirebase } from 'global/Firebase';
import { SIGN_IN, SignInResponse } from 'global/graphqls/SignIn';
import { useUserContext } from 'global/UserContext/UserContext';
import { APP_ROUTES } from 'global/AppRouter/routes';
import FormikCheckbox from 'components/FormikFields/FormikChecbox/FormikCheckbox';
import { signInWithGoogle } from 'helpers/signInWithGoogle';

import EmailIconSvg from 'assets/email.svg';
import { useTranslation } from 'react-i18next';
import { Spinner } from 'components/Spinner/Spinner';

const StyledLogo = styled.img`
  margin-top: 46px;
  margin-bottom: 36px;
`;

const CreateAccountText = styled.h5`
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.utils.text.dark};
`;

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 27px 24px 34px;
`;

const Caption = styled.span((props) => props.theme.typography.caption);

const StyledCheckbox = styled(FormikCheckbox)`
  && {
    align-self: start;
    margin-top: 16px;

    .ant-checkbox {
      margin: 8px 8px 8px 0;
    }
  }
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
      color: ${(props) => props.theme.colors.utils.text.light};
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
  color: ${(props) => props.theme.colors.functional.error};
`;

const LinkStyle = styled(Link)`
  margin-right: 2px;
`;

const LinkStyleLeft = styled(Link)`
  margin-left: 2px;
`;

export const Register: FC = () => {
  const [apiError, setApiError] = useState('');
  const { setUser, user } = useUserContext();
  const firebase = useFirebase();
  const [signIn, { loading }] = useMutation<SignInResponse>(SIGN_IN);
  const history = useHistory();
  const { t } = useTranslation();

  if (loading) {
    return <Spinner />;
  }

  const validationSchema = object({
    email: string().email(),
    password: string().required(`${t('PASSWORD_IS_REQUIRED')}`),
    repeatPassword: string()
      .oneOf([ref('password'), null], `${t('PASSWORD_DONT_MATCH')}`)
      .required(`${t('PASSWORD_CONFIRM_IS_REQUIRED')}`),
    termsAccepted: boolean()
      .required(`${t('THE_TERMS_AND_CONDITION_MUST_BE_ACCEPTED')}`)
      .oneOf([true], `${t('THE_TERMS_AND_CONDITION_MUST_BE_ACCEPTED')}`),
  });

  type FormValues = InferType<typeof validationSchema>;

  const initialValues: FormValues = {
    email: '',
    password: '',
    repeatPassword: '',
    termsAccepted: false,
  };

  if (user) {
    history.push(APP_ROUTES.MY_PERSONAS);
  }

  const handleRegister = async ({ email, password }: FormValues): Promise<void> => {
    try {
      const user = await firebase.createUserWithEmailAndPassword(email, password);

      if (!user.user?.emailVerified) {
        localStorage.setItem('emailForSignIn', email);
        await firebase.sendEmailVerification();
        history.push(`${APP_ROUTES.LOGIN}?action=verificationEmailSent`);
      } else {
        const idToken = await firebase?.getCurrentUser()?.getIdToken();
        const data = await signIn({ variables: { idToken } });
        const loggedUser = data?.data?.loginUser.user || null;
        setUser(loggedUser);

        if (loggedUser) {
          history.push(APP_ROUTES.PERSONA_CREATION_STEP_1);
        }
      }
    } catch (error) {
      setApiError(error.message);
    }
  };

  const handleGoogleLogin = async (
    formikValues: FormValues,
    setFieldTouched: (fieldName: string, isTouched: boolean, shouldUpdate: boolean) => void
  ): Promise<void> => {
    if (!formikValues.termsAccepted) {
      setFieldTouched('termsAccepted', true, true);
      return;
    }
    const idToken = await signInWithGoogle(firebase);

    if (idToken) {
      const data = await signIn({ variables: { idToken } });
      const loggedUser = data?.data?.loginUser.user || null;
      setUser(loggedUser);

      if (loggedUser) {
        history.push(APP_ROUTES.PERSONA_CREATION_STEP_1);
      }
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleRegister} validationSchema={validationSchema}>
      {({ values, setFieldTouched, errors }) => (
        <Form>
          {console.log(errors)}
          <div>
            <TopNav isWithBackArrow />
            <PageWrapper>
              <StyledLogo src={LogoRegister} alt="logo" />
              <StyledCard>
                <CreateAccountText> {t('REGISTER_HEADING_1')} </CreateAccountText>
                <InputWithSuffixIcon name="email" placeholder={t('REGISTER_EMAIL_INPUT')} svgLink={EmailIconSvg} />
                <StyledPasswordInput name="password" placeholder={t('REGISTER_PASSWORD_INPUT')} />
                <StyledPasswordInput name="repeatPassword" placeholder={t('REGISTER_PASSWORD_REPEAT')} />
                <StyledErrorMessage>{apiError}</StyledErrorMessage>
                <StyledCheckbox name="termsAccepted">
                  <Caption>
                    {t('REGISTER_REGULATIONS')}{' '}
                    <LinkStyle to={APP_ROUTES.TERM_OF_USE}>{t('REGISTER_TOS_CONFIRM')}</LinkStyle>
                    <LinkStyle to={APP_ROUTES.PRIVACY_AND_COOKIES_POLICY}>{t('REGISTER_PRIVACY_POLICY')}</LinkStyle>
                    {t('REGISTER_AND')}
                    <LinkStyleLeft to={APP_ROUTES.INFORMATIVE_CLAUSE}>{t('REGISTER_INFORMATIVE_CLAUSE')}</LinkStyleLeft>
                  </Caption>
                </StyledCheckbox>
                <RegisterButton htmlType="submit" block>
                  {t('REGISTER_REGISTER_BUTTON')}
                </RegisterButton>
                <OrRegisterCaption> {t('REGISTER_TEXT_BETWEEN_BUTTONS')}</OrRegisterCaption>
                <GoogleButton block onClick={() => handleGoogleLogin(values, setFieldTouched)}>
                  {t('REGISTER_GOOGLE_REGISTER_BUTTON')}
                </GoogleButton>
              </StyledCard>
              <LogInCaption>
                {t('REGISTER_ALREADY_HAVE_ACCOUNT')}
                {` `}
                <Link to={APP_ROUTES.LOGIN}> {t('REGISTER_ALREADY_HAVE_ACCOUNT_LOGIN')}</Link>
              </LogInCaption>
            </PageWrapper>
          </div>
        </Form>
      )}
    </Formik>
  );
};
