import React, { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import { QrScanner } from 'components/QrScanner/QrScanner';
import { Home } from 'pages/Home/Home';
import { Register } from 'pages/Register/Register';
import { Login } from 'pages/Login/Login';
import { InitialStep } from 'pages/CreatePersona/InitialStep/InitialStep';
import { ChoosePersona } from 'pages/ChoosePersona/ChoosePersona';
import { Page } from 'pages/PersonaCreation/Page/Page';
import { CreateSpotsStep1 } from 'pages/CreateSpot/CreateSpotsStep1';
import { CreateSpotsCard } from 'pages/CreateSpot/CreateSpotsCard';
import { CreateSpotsPage } from 'pages/CreateSpot/CreateSpotsPage';
import { CreatePersonaCard } from 'pages/CreatePersona/InitialStep/CreatePersonaCard';
import { CreatePersonaPage } from 'pages/CreatePersona/InitialStep/CreatePersonaPage';
import { MySpots } from 'components/MySpots/MySpots';
import { APP_ROUTES } from './routes';

export const AppRouter: FunctionComponent = () => {
  return (
    <Switch>
      <Route path={APP_ROUTES.ROOT} exact component={Home} />
      <Route path={APP_ROUTES.SCANNER} exact component={() => <QrScanner onCode={res => alert(res.data)} />} />
      <Route path={APP_ROUTES.CHOOSE_PERSONA} exact component={ChoosePersona} />
      <Route path={APP_ROUTES.LOGIN} exact component={Login} />
      <Route path={APP_ROUTES.MY_SPOTS} exact component={MySpots} />
      <Route path={APP_ROUTES.SPOT_CREATION_STEP_1} exact component={CreateSpotsStep1} />
      <Route path={APP_ROUTES.SPOT_CREATION_STEP_2} exact component={CreateSpotsCard} />
      <Route path={APP_ROUTES.SPOT_CREATION_STEP_3} exact component={CreateSpotsPage} />
      <Route path={APP_ROUTES.REGISTER} exact component={Register} />
      <Route path={APP_ROUTES.PERSONA_CREATION_STEP_1} exact component={InitialStep} />
      <Route path={APP_ROUTES.PERSONA_CREATION_STEP_2} exact component={CreatePersonaCard} />
      <Route path={APP_ROUTES.PERSONA_CREATION_STEP_3} exact component={CreatePersonaPage} />
      <Route path="/persona-creation/page" exact component={Page} />
    </Switch>
  );
};
