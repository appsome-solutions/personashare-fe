import React, { FC, useState, useCallback } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { InferType, object, ref, string } from 'yup';
import { useHistory } from 'react-router-dom';

import { useFirebase } from 'global/Firebase';
import { getUrlsParams } from 'helpers/URLParams';
import { TopNav } from 'components/TopNav/TopNav';
import { PageWrapper } from 'components/PageWrapper';
import { FormComponent } from 'components/FormComponent/FormComponent';
import { PasswordInput } from 'components/PasswordInput';
import { StyledErrorMessage } from 'components/StyledErrorMessage/StyledErrorMessage';

import LogoWithoutBG from 'assets/logo_nobg.svg';
import { useTranslation } from 'react-i18next';
import { useApiErrorsTranslation } from 'global/Firebase/ApiErrorsTranslations/ApiErrorsTranslations';
import { StickyNavigation } from '../../global/Layouts/StickyNavigation/StickyNavigation';

const StyledLogo = styled.img`
  margin-top: 18px;
  margin-bottom: 18px;
  width: 100%;
`;

const StyledPasswordInput = styled(PasswordInput)`
  margin-top: 24px;
`;

export const ChangePassword: FC = () => {
  const [apiError, setApiError] = useState('');
  const { getErrorMessage } = useApiErrorsTranslation();
  const { handleResetPassword } = useFirebase();
  const history = useHistory();
  const { t } = useTranslation();

  const validationSchema = object({
    password: string().required(`${t('PASSWORD_IS_REQUIRED')}`),
    repeatPassword: string()
      .oneOf([ref('password'), null], `${t('PASSWORD_DONT_MATCH')}`)
      .required(`${t('PASSWORD_CONFIRM_IS_REQUIRED')}`),
  });

  type ChangePasswordFormValues = InferType<typeof validationSchema>;

  const initialValues: ChangePasswordFormValues = {
    password: '',
    repeatPassword: '',
  };

  const handleSubmit = useCallback(
    async ({ password }: ChangePasswordFormValues) => {
      const { oobCode, continueUrl } = getUrlsParams(['oobCode', 'continueUrl']);
      setApiError('');
      try {
        const redirectUrl = await handleResetPassword(password, oobCode, continueUrl);
        history.push(redirectUrl);
      } catch (e) {
        if (e.code) {
          setApiError(getErrorMessage(e.code));
        } else {
          setApiError(e.message ? e.message : 'Error while resetting password');
        }
      }
    },
    [history, handleResetPassword, setApiError]
  );

  return (
    <div>
      <TopNav isWithBackArrow />
      <PageWrapper justifyContent="flex-start">
        <StyledLogo src={LogoWithoutBG} />
        <FormComponent
          title={t('CHANGE_PASSWORD_TITLE')}
          buttonLabel={t('CHANGE_PASSWORD_BUTTON')}
          formId="change_password"
        >
          <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
            {() => (
              <Form id="change_password">
                <StyledPasswordInput name="password" placeholder={t('CHANGE_PASSWORD_INPUT_1')} />
                <StyledPasswordInput name="repeatPassword" placeholder={t('CHANGE_PASSWORD_INPUT_2')} />
                <StyledErrorMessage>{apiError}</StyledErrorMessage>
              </Form>
            )}
          </Formik>
        </FormComponent>
      </PageWrapper>
      <StickyNavigation />
    </div>
  );
};
