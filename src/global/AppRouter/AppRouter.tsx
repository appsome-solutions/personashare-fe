import React, { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import { QrScanner } from 'components/QrScanner/QrScanner';
import { Home } from 'pages/Home/Home';
import { Register } from 'pages/Register/Register';
import { Login } from 'pages/Login/Login';
import { InitialStep } from 'pages/CreatePersona/InitialStep/InitialStep';
import { CreateCard } from 'pages/CreatePersona/CreateCard/CreateCard';
import { CreatePage } from 'pages/CreatePersona/CreatePage/CreatePage';

export const AppRouter: FunctionComponent = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/scanner" exact component={() => <QrScanner onCode={res => alert(res.data)} />} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/createpersona" exact component={InitialStep} />
      <Route path="/createpersona/card" exact component={CreateCard} />
      <Route path="/createpersona/page" exact component={CreatePage} />
    </Switch>
  );
};
