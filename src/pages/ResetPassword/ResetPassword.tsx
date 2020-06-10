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
  const handleSubmit = useCallback(
    async (values) => {
      setApiError('');
      try {
        await sendPasswordResetEmail(values.email);
        history.push(APP_ROUTES.LOGIN);
      } catch (e) {
        setApiError(e.message ? e.message : 'Error while sending an reset email');
      }
    },
    [history, sendPasswordResetEmail, setApiError]
  );

  return (
    <div>
      <TopNav isWithBackArrow />
      <PageWrapper justifyContent="flex-start">
        <StyledLogo src={LogoWithoutBG} />
        <FormComponent title="Reset password" buttonLabel="Send" formId="reset_password">
          <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
            {() => (
              <Form id="reset_password">
                <InputField name="email" placeholder="Email" svgLink={EmailIconSvg} />
                <StyledErrorMessage>{apiError}</StyledErrorMessage>
              </Form>
            )}
          </Formik>
        </FormComponent>
      </PageWrapper>
    </div>
  );
};
