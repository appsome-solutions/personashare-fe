import React, { FC } from 'react';
import facebookLogo from 'assets/facebookLogo.svg';
import { PersonaFamilySteps } from './PersonaFamilySteps';
import { APP_ROUTES } from '../../global/AppRouter/routes';
import { useTranslation } from 'react-i18next';

export const PersonaFamilyStep2: FC = () => {
  const { t } = useTranslation();

  return (
    <PersonaFamilySteps
      redirectLink={APP_ROUTES.PERSONA_FAMILY_STEP_3}
      textInComponent={t('PERSONA_SHARE_FAMILY_STEP_2')}
      linkInHref="https://www.facebook.com/PersonaShare-110785183877737/"
      buttonText={t('WHAT_MORE')}
      linkedInLogo={facebookLogo}
      currentNumber={2}
    />
  );
};
