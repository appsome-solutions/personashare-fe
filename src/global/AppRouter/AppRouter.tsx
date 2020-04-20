import React, { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import { QrScanner } from 'components/QrScanner/QrScanner';
import { Home } from 'pages/Home/Home';
import { Register } from 'pages/Register/Register';
import { Login } from 'pages/Login/Login';
import { InitialStep } from 'pages/CreatePersona/InitialStep/InitialStep';
import { ChoosePersona } from 'pages/ChoosePersona/ChoosePersona';
import { Page } from 'pages/PersonaCreation/Page/Page';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import { CreateSpotsStep1 } from 'pages/CreateSpot/CreateSpotsStep1';
import { CreateSpotsCard } from 'pages/CreateSpot/CreateSpotsCard';
import { CreateSpotsPage } from 'pages/CreateSpot/CreateSpotsPage';
import { CreatePersonaCard } from 'pages/CreatePersona/InitialStep/CreatePersonaCard';
import { CreatePersonaPage } from 'pages/CreatePersona/InitialStep/CreatePersonaPage';
import { MySpots } from 'components/MySpots/MySpots';
import { EditSpotPage } from 'components/EditPageAndCard/EditSpot/EditSpotPage';
import { EditSpotCard } from 'components/EditPageAndCard/EditSpot/EditSpotCard';
import { EditPersonaPage } from 'components/EditPageAndCard/EditPersona/EditPersonaPage';
import { EditPersonaCard } from 'components/EditPageAndCard/EditPersona/EditPersonaCard';
import { MyPersona } from 'components/MyPersona/MyPersona';

export const AppRouter: FunctionComponent = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/scanner" exact component={() => <QrScanner onCode={res => alert(res.data)} />} />
      <Route path="/my-spots" exact component={MySpots} />
      <PrivateRoute
        path={`/choose-persona/(saved|recommend|participant-joined|manager-joined)/(spot|persona)/:actionId`}
        exact
        component={ChoosePersona}
      />
      <Route path="/edit/spot/:uuid/step/1" exact component={EditSpotCard} />
      <Route path="/edit/persona/:uuid/step/1" exact component={EditPersonaCard} />
      <Route path="/edit/spot/:uuid/step/2" exact component={EditSpotPage} />
      <Route path="/edit/persona/:uuid/step/2" exact component={EditPersonaPage} />
      <Route path="/my-personas" exact component={MyPersona} />
      <Route path="/login" exact component={Login} />
      <Route path="/my-spots" exact component={MySpots} />
      <Route path="/creation/step/1/entity/spot" exact component={CreateSpotsStep1} />
      <Route path="/creation/step/2/entity/spot" exact component={CreateSpotsCard} />
      <Route path="/creation/step/3/entity/spot" exact component={CreateSpotsPage} />
      <Route path="/register" exact component={Register} />
      <PrivateRoute path="/creation/step/1/entity/persona" exact component={InitialStep} />
      <Route path="/creation/step/2/entity/persona" exact component={CreatePersonaCard} />
      <Route path="/creation/step/3/entity/persona" exact component={CreatePersonaPage} />
      <Route path="/persona-creation/page" exact component={Page} />
    </Switch>
  );
};
