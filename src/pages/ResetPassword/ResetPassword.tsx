import React, { FC } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { InferType, object, string } from 'yup';

import { TopNav } from 'components/TopNav/TopNav';
import { PageWrapper } from 'components/PageWrapper';
import { FormComponent } from 'components/FormComponent/FormComponent';
import { InputWithSuffixIcon } from 'components/InputWithSuffixIcon/InputWithSuffixIcon';

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
  email: string()
    .email()
    .required(),
});

type ResetPasswordFormValues = InferType<typeof validationSchema>;

const initialValues: ResetPasswordFormValues = {
  email: '',
};

export const ResetPassword: FC = () => {
  return (
    <div>
      <TopNav isWithBackArrow />
      <PageWrapper justifyContent="flex-start">
        <StyledLogo src={LogoWithoutBG} />
        <FormComponent title="Reset password" buttonLabel="Send" formId="reset_password">
          <Formik
            initialValues={initialValues}
            onSubmit={values => {
              console.log(values);
            }}
            validationSchema={validationSchema}
          >
            {() => (
              <Form id="reset_password">
                <InputField name="email" placeholder="Email" svgLink={EmailIconSvg} />
              </Form>
            )}
          </Formik>
        </FormComponent>
      </PageWrapper>
    </div>
  );
};
