import React, { ComponentType } from 'react';
import { Route, Redirect, RouteProps, useLocation } from 'react-router-dom';
import { useUserContext } from 'global/UserContext/UserContext';
import { APP_ROUTES } from 'global/AppRouter/routes';

type Props = {
  component: ComponentType;
} & RouteProps;

export const PrivateRoute = ({ component: Component, ...rest }: Props) => {
  const { user } = useUserContext();
  const { pathname } = useLocation();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user && !user.defaultPersona && !pathname.match(/\/creation.*\/entity\/persona/)?.length) {
          return (
            <Redirect
              to={{
                pathname: APP_ROUTES.PERSONA_CREATION_STEP_1,
                state: { from: props.location },
              }}
            />
          );
        } else if (user) {
          return <Component {...props} />;
        }
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};
export default PrivateRoute;
