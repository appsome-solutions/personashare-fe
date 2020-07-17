import React, { FC, useCallback, useState } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { InferType, object, string } from 'yup';
import { useHistory } from 'react-router-dom';

import { useFirebase } from 'global/Firebase';
import { APP_ROUTES } from 'global/AppRouter/routes';
import { TopNav } from 'components/TopNav/TopNav';
import { PageWrapper } from 'components/PageWrapper';
import { FormComponent } from 'components/FormComponent/FormComponent';
import { InputWithSuffixIcon } from 'components/InputWithSuffixIcon/InputWithSuffixIcon';
import { StyledErrorMessage } from 'components/StyledErrorMessage/StyledErrorMessage';

import LogoWithoutBG from 'assets/logo_nobg.svg';
import EmailIconSvg from 'assets/email.svg';
import { useTranslation } from 'react-i18next';
import { useApiErrorsTranslation } from 'global/Firebase/ApiErrorsTranslations/ApiErrorsTranslations';

const StyledLogo = styled.img`
  margin-top: 18px;
  margin-bottom: 18px;
  width: 100%;
`;

const InputField = styled(InputWithSuffixIcon)`
  margin-top: 24px;
`;

const validationSchema = object({
  email: string().email().required(),
});

type ResetPasswordFormValues = InferType<typeof validationSchema>;

const initialValues: ResetPasswordFormValues = {
  email: '',
};

export const ResetPassword: FC = () => {
  const { sendPasswordResetEmail } = useFirebase();
  const history = useHistory();
  const [apiError, setApiError] = useState('');
  const { getErrorMessage } = useApiErrorsTranslation();
  const { t } = useTranslation();
  const handleSubmit = useCallback(
    async (values) => {
      setApiError('');
      try {
        await sendPasswordResetEmail(values.email);
        history.push(APP_ROUTES.LOGIN);
      } catch (e) {
        if (e.code) {
          setApiError(getErrorMessage(e.code));
        } else {
          setApiError(e.message ? e.message : `${t('ERROR_WHILE_SENDING_EMAIL')}`);
        }
      }
    },
    [history, sendPasswordResetEmail, setApiError]
  );

  return (
    <div>
      <TopNav isWithBackArrow />
      <PageWrapper justifyContent="flex-start">
        <StyledLogo src={LogoWithoutBG} />
        <FormComponent
          title={t('RESET_PASSWORD_TITLE')}
          buttonLabel={t('RESET_PASSWORD_BUTTON')}
          formId="reset_password"
        >
          <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
            {() => (
              <Form id="reset_password">
                <InputField name="email" placeholder={t('RESET_PASSWORD_INPUT_1')} svgLink={EmailIconSvg} />
                <StyledErrorMessage>{apiError}</StyledErrorMessage>
              </Form>
            )}
          </Formik>
        </FormComponent>
      </PageWrapper>
    </div>
  );
};
