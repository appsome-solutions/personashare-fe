import React, { FC } from 'react';
import { createCtx } from 'helpers/Context';
import { useTranslation } from 'react-i18next';

// https://firebase.google.com/docs/reference/js/firebase.auth.Auth

const ApiErrors: Record<string, string> = {
  'auth/user-disabled': 'USER_DISABLED',
  'auth/email-already-exists': 'EMAIL_ALREADY_EXISTS',
  'auth/internal-error': 'INTERNAL_ERROR',
  'auth/invalid-password': 'INVALID_PASSWORD',
  'auth/user-not-found': 'USER_NOT_FOUND',
  'auth/wrong-password': 'WRONG_PASSWORD',
  'auth/weak-password': 'WEAK_PASSWORD',
  'auth/email-already-in-use': 'EMAIL_IN_USE',
  'auth/invalid-email': 'INVALID_EMAIL',
  'auth/operation-not-allowed': 'OPERATION_NOT_ALLOWED',
  'auth/account-exists-with-different-credential': 'ACCOUNT_EXISTS_WITH_DIFFERENT_CRED',
  'auth/credential-already-in-use': 'CREDENTIAL_IN_USE',
  'auth/timeout': 'TIMEOUT',
};

interface ApiErrorsContext {
  getErrorMessage(errorCode: string): string;
}

const [useApiErrorsTranslation, ApiErrorsContext] = createCtx<ApiErrorsContext>();

const ApiErrorsTranslationsProvider: FC = ({ children }) => {
  const { t } = useTranslation();
  const getErrorMessage: ApiErrorsContext['getErrorMessage'] = (key) => t(ApiErrors[key]);

  return <ApiErrorsContext value={{ getErrorMessage }}>{children}</ApiErrorsContext>;
};

export { useApiErrorsTranslation, ApiErrorsTranslationsProvider };
