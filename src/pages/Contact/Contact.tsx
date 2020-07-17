import React, { FC, useState, useCallback } from 'react';
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
import { FormikTextArea } from 'components/FormikFields/FormikInput/FormikInput';
import { StyledErrorMessage } from 'components/StyledErrorMessage/StyledErrorMessage';

import LogoWithoutBG from 'assets/logo_nobg.svg';
import EmailIconSvg from 'assets/email.svg';
import PersonSvg from 'assets/person-24px.svg';
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

const Message = styled(FormikTextArea)`
  margin-top: 24px;
`;

const validationSchema = object({
  name: string().required(),
  email: string().email().required(),
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
  const { getErrorMessage } = useApiErrorsTranslation();
  const [apiError, setApiError] = useState('');
  const history = useHistory();
  const { t } = useTranslation();
  const handleSubmit = useCallback(
    (values) => {
      setApiError('');
      sendMail({
        message: {
          subject: `Name: ${values.name} <br /> Email: ${values.email} <br /> Message: ${values.message} <br />`,
          html: values.message,
        },
      })
        .then(() => {
          history.push(APP_ROUTES.SPOT_CREATION_STEP_1);
        })
        .catch((e) => {
          setApiError(e.message ? e.message : `${t('ERROR_WHILE_SENDING_EMAIL')}`);
        });
    },
    [setApiError, sendMail, history]
  );

  return (
    <div>
      <TopNav isWithBackArrow />
      <PageWrapper justifyContent="flex-start">
        <StyledLogo src={LogoWithoutBG} />
        <FormComponent title={t('CONTACT_TITLE')} buttonLabel={t('CONTACT_BUTTON')} formId="contact">
          <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
            {() => (
              <Form id="contact">
                <InputField name="name" placeholder={t('CONTACT_INPUT_1')} svgLink={PersonSvg} />
                <InputField name="email" placeholder={t('CONTACT_INPUT_2')} svgLink={EmailIconSvg} />
                <Message name="message" placeholder={t('CONTACT_INPUT_3')} type="textarea" rows={4} />
                <StyledErrorMessage>{apiError}</StyledErrorMessage>
              </Form>
            )}
          </Formik>
        </FormComponent>
      </PageWrapper>
    </div>
  );
};
