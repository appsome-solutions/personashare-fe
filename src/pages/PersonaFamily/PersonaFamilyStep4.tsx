import React, { FC } from 'react';
import contactUsLogo from 'assets/linkedInLogo.svg';
import { PersonaFamilySteps } from './PersonaFamilySteps';
import { APP_ROUTES } from '../../global/AppRouter/routes';
import { useTranslation } from 'react-i18next';

export const PersonaFamilyStep4: FC = () => {
  const { t } = useTranslation();

  return (
    <PersonaFamilySteps
      redirectLink={APP_ROUTES.CONTACT}
      textInComponent={t('PERSONA_SHARE_FAMILY_STEP_4')}
      linkInHref="https://docs.google.com/forms/d/e/1FAIpQLSeqmV4JfS2j1U_cctx4nNMFWixJJsa9sltrrSQrtc29-hrN7Q/viewform?usp=sf_link"
      buttonText={t('CONTACT_US')}
      linkedInLogo={contactUsLogo}
      currentNumber={4}
    />
  );
};
