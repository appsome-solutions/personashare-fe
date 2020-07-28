import React, { FC } from 'react';
import linkedInLogo from 'assets/linkedInLogo.svg';
import { PersonaFamilySteps } from './PersonaFamilySteps';
import { APP_ROUTES } from '../../global/AppRouter/routes';
import { useTranslation } from 'react-i18next';
import { StickyNavigation } from '../../global/Layouts/StickyNavigation/StickyNavigation';

export const PersonaFamilyStep3: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PersonaFamilySteps
        redirectLink={APP_ROUTES.PERSONA_FAMILY_STEP_4}
        textInComponent={t('PERSONA_SHARE_FAMILY_STEP_3')}
        linkInHref="https://www.linkedin.com/groups/8868704/"
        buttonText={t('WHAT_MORE')}
        logo={linkedInLogo}
        currentNumber={3}
      />
      <StickyNavigation />
    </>
  );
};
