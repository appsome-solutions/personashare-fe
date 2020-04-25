import React, { FC, useState, useCallback } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { InferType, object, string } from 'yup';

import { useFirebase } from 'global/Firebase';
import { APP_ROUTES } from 'global/AppRouter/routes';
import { TopNav } from 'components/TopNav/TopNav';
import { PageWrapper } from 'components/PageWrapper';
import { FormComponent } from 'components/FormComponent/FormComponent';
import { InputWithSuffixIcon } from 'components/InputWithSuffixIcon/InputWithSuffixIcon';
import { FormikTextArea } from 'components/FormikFields/FormikInput/FormikInput';

import LogoWithoutBG from 'assets/logo_nobg.svg';
import EmailIconSvg from 'assets/email.svg';
import PersonSvg from 'assets/person-24px.svg';
import { useHistory } from 'react-router-dom';

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

const StyledErrorMessage = styled.div`
  color: ${props => props.theme.colors.functional.error};
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
  const { sendMail } = useFirebase();
  const [apiError, setApiError] = useState('');
  const history = useHistory();
  const handleSubmit = useCallback(values => {
    setApiError('');
    sendMail({
      from: values.email,
      message: {
        subject: values.name,
        html: values.message,
      },
    })
      .then(() => {
        history.push(APP_ROUTES.SPOT_CREATION_STEP_1);
      })
      .catch(e => {
        setApiError(e.message ? e.message : 'Error while sending an email');
      });
  }, []);

  return (
    <div>
      <TopNav isWithBackArrow />
      <PageWrapper justifyContent="flex-start">
        <StyledLogo src={LogoWithoutBG} />
        <FormComponent title="Contact form" buttonLabel="Send" formId="contact_form">
          <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
            {() => (
              <Form id="contact_form">
                <InputField name="name" placeholder="Name" svgLink={PersonSvg} />
                <InputField name="email" placeholder="Email" svgLink={EmailIconSvg} />
                <Message name="message" placeholder="Message" type="textarea" rows={4} />
                <StyledErrorMessage>{apiError}</StyledErrorMessage>
              </Form>
            )}
          </Formik>
        </FormComponent>
      </PageWrapper>
    </div>
  );
};
