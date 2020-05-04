import React from 'react';
import { Redirect } from 'react-router-dom';
import { APP_ROUTES } from 'global/AppRouter/routes';

export const Home = () => {
  return <Redirect to={APP_ROUTES.SCANNER} />;
};
