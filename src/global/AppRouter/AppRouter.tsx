import React, { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from '../../pages/Home/Home';
import { Register } from '../../pages/Register/Register';
import { QrScanner } from 'components/QrScanner/QrScanner';
import { Login } from 'pages/Login/Login';

export const AppRouter: FunctionComponent = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/scanner" exact component={() => <QrScanner onCode={res => alert(res.data)} />} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
    </Switch>
  );
};
