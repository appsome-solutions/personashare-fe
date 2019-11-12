import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface HOCProps {
  children: ReactNode;
}

export const withTranslation = (Component: ReactNode) => (props: HOCProps) => {
  const { t } = useTranslation();

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return <Component t={t} {...props} />;
};
