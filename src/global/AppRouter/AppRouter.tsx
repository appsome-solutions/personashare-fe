import React, { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from '../../pages/Home/Home';
import { Register } from '../../pages/Register/Register';

export const AppRouter: FunctionComponent = () => {
  return (
    <>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={Register} />
      </Switch>
    </>
  );
};
