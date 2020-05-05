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
import { Contact } from 'pages/Contact/Contact';
import { ResetPassword } from 'pages/ResetPassword/ResetPassword';
import { ChangePassword } from 'pages/ChangePassword/ChangePassword';
import { MySpots } from 'components/MySpots/MySpots';
import { EditSpotPage } from 'components/EditPageAndCard/EditSpot/EditSpotPage';
import { EditSpotCard } from 'components/EditPageAndCard/EditSpot/EditSpotCard';
import { EditPersonaPage } from 'components/EditPageAndCard/EditPersona/EditPersonaPage';
import { EditPersonaCard } from 'components/EditPageAndCard/EditPersona/EditPersonaCard';
import { MyPersona } from 'components/MyPersona/MyPersona';
import { TermOfUse } from 'components/TermandPrivacy/TermOfUse';
import { PrivacyAndCookies } from 'components/TermandPrivacy/PrivacyAndCookies';
import { InformativeClause } from 'components/TermandPrivacy/InformativeClausule';
import { ContactBook } from 'components/ContactBook/ContactBook';
import { APP_ROUTES } from './routes';
import { SpotBook } from 'components/SpotBook/SpotBook';

export const AppRouter: FunctionComponent = () => {
  return (
    <Switch>
      <Route path={APP_ROUTES.ROOT} exact component={Home} />
      <Route path={APP_ROUTES.SCANNER} exact component={() => <QrScanner onCode={res => alert(res.data)} />} />
      <Route path={APP_ROUTES.MY_SPOTS} exact component={MySpots} />
      <Route path={APP_ROUTES.CHOOSE_PERSONA} exact component={ChoosePersona} />
      <Route path="/my-personas" exact component={MyPersona} />
      <Route path="/my-spots" exact component={MySpots} />
      <Route path="/informativeclause" exact component={InformativeClause} />
      <Route path="/privacyandcookiespolicy" exact component={PrivacyAndCookies} />
      <Route path="/termsofuse" exact component={TermOfUse} />
      <Route path="/edit/spot/:uuid/step/1" exact component={EditSpotCard} />
      <Route path="/edit/persona/:uuid/step/1" exact component={EditPersonaCard} />
      <Route path="/edit/spot/:uuid/step/2" exact component={EditSpotPage} />
      <Route path="/edit/persona/:uuid/step/2" exact component={EditPersonaPage} />
      <Route path={APP_ROUTES.LOGIN} exact component={Login} />
      <Route path={APP_ROUTES.SPOT_CREATION_STEP_1} exact component={CreateSpotsStep1} />
      <Route path={APP_ROUTES.SPOT_CREATION_STEP_2} exact component={CreateSpotsCard} />
      <Route path={APP_ROUTES.SPOT_CREATION_STEP_3} exact component={CreateSpotsPage} />
      <Route path={APP_ROUTES.REGISTER} exact component={Register} />
      <PrivateRoute path={APP_ROUTES.PERSONA_CREATION_STEP_1} exact component={InitialStep} />
      <Route path={APP_ROUTES.PERSONA_CREATION_STEP_2} exact component={CreatePersonaCard} />
      <Route path={APP_ROUTES.PERSONA_CREATION_STEP_3} exact component={CreatePersonaPage} />
      <Route path="/persona-creation/page" exact component={Page} />
      <Route path={APP_ROUTES.CONTACT_FORM} exact component={Contact} />
      <Route path={APP_ROUTES.RESET_PASSWORD} exact component={ResetPassword} />
      <Route path={APP_ROUTES.CHANGE_PASSWORD} exact component={ChangePassword} />
      <Route path={APP_ROUTES.SPOT_BOOK} exact component={SpotBook} />
      <Route path={APP_ROUTES.CONTACT_BOOK} exact component={ContactBook} />
    </Switch>
  );
};
