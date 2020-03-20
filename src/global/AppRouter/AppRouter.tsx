import React, { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import { QrScanner } from 'components/QrScanner/QrScanner';
import { Home } from 'pages/Home/Home';
import { Register } from 'pages/Register/Register';
import { Login } from 'pages/Login/Login';
import { InitialStep } from 'pages/CreatePersona/InitialStep/InitialStep';
import { Personas } from 'pages/Personas/Personas';
import { Page } from 'pages/PersonaCreation/Page/Page';
import { MySpots } from 'components/MySpots/MySpots';
import { CreateSpotsStep1 } from 'pages/CreateSpot/CreateSpotsStep1';
import { CreateSpotsCard } from 'pages/CreateSpot/CreateSpotsCard';
import { CreateSpotsPage } from 'pages/CreateSpot/CreateSpotsPage';
import { CreatePersonaCard } from 'pages/CreatePersona/InitialStep/CreatePersonaCard';
import { CreatePersonaPage } from 'pages/CreatePersona/InitialStep/CreatePersonaPage';

export const AppRouter: FunctionComponent = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/scanner" exact component={() => <QrScanner onCode={res => alert(res.data)} />} />
      <Route path="/personas" exact component={Personas} />
      <Route path="/my-spots" exact component={MySpots} />
      <Route path="/login" exact component={Login} />
      <Route path="/creation/step/1/entity/spot" exact component={CreateSpotsStep1} />
      <Route path="/creation/step/2/entity/spot" exact component={CreateSpotsCard} />
      <Route path="/creation/step/3/entity/spot" exact component={CreateSpotsPage} />
      <Route path="/register" exact component={Register} />
      <Route path="/createpersona" exact component={InitialStep} />
      <Route path="/createpersona/card" exact component={CreatePersonaCard} />
      <Route path="/createpersona/page" exact component={CreatePersonaPage} />
      <Route path="/persona-creation/page" exact component={Page} />
    </Switch>
  );
};
