import React, { FC } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { InferType, object, string } from 'yup';

import { TopNav } from 'components/TopNav/TopNav';
import { PageWrapperSpaceBetween } from 'components/PageWrapper';
import { FormComponent } from 'components/FormComponent/FormComponent';
import { InputWithSuffixIcon } from 'components/InputWithSuffixIcon/InputWithSuffixIcon';
import { FormikTextArea } from 'components/FormikFields/FormikInput/FormikInput';

import LogoWithoutBG from 'assets/logo_nobg.svg';
import EmailIconSvg from 'assets/email.svg';
import PersonSvg from 'assets/person-24px.svg';

const StyledLogo = styled.img`
  margin-top: 18px;
  margin-bottom: 18px;
  width: 100%;
`;

const InputField = styled(InputWithSuffixIcon)`
  margin-top: 24px;
`;

const Message = styled(FormikTextArea)`
  margin-top: 24px;
`;

const validationSchema = object({
  name: string().required(),
  email: string()
    .email()
    .required(),
  message: string().required(),
});

type ContactFormValues = InferType<typeof validationSchema>;

const initialValues: ContactFormValues = {
  name: '',
  email: '',
  message: '',
};

export const Contact: FC = () => {
  return (
    <div>
      <TopNav isWithBackArrow />
      <PageWrapperSpaceBetween>
        <StyledLogo src={LogoWithoutBG} />
        <FormComponent title="Contact form" buttonLabel="Send" formId="contact_form">
          <Formik
            initialValues={initialValues}
            onSubmit={values => {
              console.log(values);
            }}
            validationSchema={validationSchema}
          >
            {() => (
              <Form id="contact_form">
                <InputField name="name" placeholder="Name" svgLink={PersonSvg} />
                <InputField name="email" placeholder="Email" svgLink={EmailIconSvg} />
                <Message name="message" placeholder="Message" type="textarea" rows={4} />
              </Form>
            )}
          </Formik>
        </FormComponent>
      </PageWrapperSpaceBetween>
    </div>
  );
};
