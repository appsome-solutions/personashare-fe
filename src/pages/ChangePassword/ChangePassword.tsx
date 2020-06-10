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

const StyledLogo = styled.img`
  margin-top: 18px;
  margin-bottom: 18px;
  width: 100%;
`;

const StyledPasswordInput = styled(PasswordInput)`
  margin-top: 24px;
`;

const validationSchema = object({
  password: string().required('Password is required'),
  repeatPassword: string()
    .oneOf([ref('password'), null], "Passwords don't match")
    .required('Password confirm is required'),
});

type ChangePasswordFormValues = InferType<typeof validationSchema>;

const initialValues: ChangePasswordFormValues = {
  password: '',
  repeatPassword: '',
};

export const ChangePassword: FC = () => {
  const [apiError, setApiError] = useState('');
  const { handleResetPassword } = useFirebase();
  const history = useHistory();
  const handleSubmit = useCallback(
    async ({ password }: ChangePasswordFormValues) => {
      const { oobCode, continueUrl } = getUrlsParams(['oobCode', 'continueUrl']);
      setApiError('');
      try {
        const redirectUrl = await handleResetPassword(password, oobCode, continueUrl);
        history.push(redirectUrl);
      } catch (e) {
        setApiError(e.message ? e.message : 'Error while resetting password');
      }
    },
    [history, handleResetPassword, setApiError]
  );

  return (
    <div>
      <TopNav isWithBackArrow />
      <PageWrapper justifyContent="flex-start">
        <StyledLogo src={LogoWithoutBG} />
        <FormComponent title="Change your password" buttonLabel="Send" formId="change_password">
          <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
            {() => (
              <Form id="change_password">
                <StyledPasswordInput name="password" placeholder="New password" />
                <StyledPasswordInput name="repeatPassword" placeholder="Repeat new password" />
                <StyledErrorMessage>{apiError}</StyledErrorMessage>
              </Form>
            )}
          </Formik>
        </FormComponent>
      </PageWrapper>
    </div>
  );
};
