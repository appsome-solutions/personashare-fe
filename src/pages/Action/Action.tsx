import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { getUrlsParams } from 'helpers/URLParams';
import { APP_ROUTES } from 'global/AppRouter/routes';

export type ActionType = 'verify' | 'verificationEmailSent';

export const Action: FC = () => {
  const { mode, oobCode, continueUrl } = getUrlsParams(['oobCode', 'continueUrl', 'mode']);
  const history = useHistory();

  if (mode === 'resetPassword') {
    history.replace(`${APP_ROUTES.CHANGE_PASSWORD}?oobCode=${oobCode}&continueUrl=${continueUrl}`);
    return null;
  }

  if (mode === 'verifyEmail') {
    history.replace(`${APP_ROUTES.LOGIN}?actionCode=${oobCode}&action=verify`);
    return null;
  }

  history.replace(APP_ROUTES.LOGIN);

  return null;
};
