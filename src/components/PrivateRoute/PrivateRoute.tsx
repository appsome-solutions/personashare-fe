import React, { ComponentType } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useUserContext } from 'global/UserContext/UserContext';

type Props = {
  component: ComponentType;
} & RouteProps;

export const PrivateRoute = ({ component: Component, ...rest }: Props) => {
  const { user } = useUserContext();
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...(props as any)} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
export default PrivateRoute;
