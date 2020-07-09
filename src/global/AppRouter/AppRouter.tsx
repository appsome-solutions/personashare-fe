import React, { FunctionComponent, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { QrScanner } from 'components/QrScanner/QrScanner';
import { Home } from 'pages/Home/Home';
import { Register } from 'pages/Register/Register';
import { Login } from 'pages/Login/Login';
import { InitialStep } from 'pages/CreatePersona/InitialStep/InitialStep';
import { ChoosePersona } from 'pages/ChoosePersona/ChoosePersona';
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
import { PersonaPreview } from 'components/PersonaPreview/PersonaPreview';
import { SpotPreview } from 'pages/SpotPreview/SpotPreview';
import { SpotInvitation } from 'components/SpotBook/ManagerList/SpotInvitation';
import QuillEditor from 'components/QuillEditor/QuillEditor';
import { NavigationPersonaStats } from 'components/Statistics/NavigationPersonaStats';
import { NavigationSpotStats } from 'components/Statistics/NavigationSpotStats';
import { Action } from 'pages/Action/Action';
import { PersonaFamily } from 'pages/PersonaFamily/PersonaFamily';
import { PersonaFamilyStep2 } from 'pages/PersonaFamily/PersonaFamilyStep2';
import { PersonaFamilyStep4 } from 'pages/PersonaFamily/PersonaFamilyStep4';
import { PersonaFamilyStep3 } from 'pages/PersonaFamily/PersonaFamilyStep3';

export const AppRouter: FunctionComponent = () => {
  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/editor" exact component={QuillEditor} />
        <Route path={APP_ROUTES.ROOT} exact component={Home} />
        <Route path={APP_ROUTES.SCANNER} exact component={QrScanner} />
        <PrivateRoute path={APP_ROUTES.MY_SPOTS} exact component={MySpots} />
        <PrivateRoute path={APP_ROUTES.CHOOSE_PERSONA} exact component={ChoosePersona} />
        <PrivateRoute path={APP_ROUTES.MY_PERSONAS} exact component={MyPersona} />
        <PrivateRoute path={APP_ROUTES.MY_SPOTS} exact component={MySpots} />
        <Route path={APP_ROUTES.INFORMATIVE_CLAUSE} exact component={InformativeClause} />
        <Route path={APP_ROUTES.PRIVACY_AND_COOKIES_POLICY} exact component={PrivacyAndCookies} />
        <Route path={APP_ROUTES.TERM_OF_USE} exact component={TermOfUse} />
        <PrivateRoute path={APP_ROUTES.EDIT_SPOT_UUID_STEP_1(':uuid')} exact component={EditSpotCard} />
        <PrivateRoute path={APP_ROUTES.EDIT_PERSONA_UUID_STEP_1(':uuid')} exact component={EditPersonaCard} />
        <PrivateRoute path={APP_ROUTES.EDIT_SPOT_UUID_STEP_2(':uuid')} exact component={EditSpotPage} />
        <PrivateRoute path={APP_ROUTES.EDIT_PERSONA_UUID_STEP_2(':uuid')} exact component={EditPersonaPage} />
        <Route path={APP_ROUTES.LOGIN} exact component={Login} />
        <PrivateRoute path={APP_ROUTES.SPOT_CREATION_STEP_1} exact component={CreateSpotsStep1} />
        <PrivateRoute path={APP_ROUTES.SPOT_CREATION_STEP_2} exact component={CreateSpotsCard} />
        <PrivateRoute path={APP_ROUTES.SPOT_CREATION_STEP_3} exact component={CreateSpotsPage} />
        <Route path={APP_ROUTES.REGISTER} exact component={Register} />
        <PrivateRoute path={APP_ROUTES.PERSONA_CREATION_STEP_1} exact component={InitialStep} />
        <Route path={APP_ROUTES.PERSONA_CREATION_STEP_2} exact component={CreatePersonaCard} />
        <Route path={APP_ROUTES.PERSONA_CREATION_STEP_3} exact component={CreatePersonaPage} />
        <Route path={APP_ROUTES.CONTACT} exact component={Contact} />
        <Route path={APP_ROUTES.RESET_PASSWORD} exact component={ResetPassword} />
        <Route path={APP_ROUTES.CHANGE_PASSWORD} exact component={ChangePassword} />
        <Route path={APP_ROUTES.SPOT_BOOK} exact component={SpotBook} />
        <Route path={APP_ROUTES.CONTACT_BOOK} exact component={ContactBook} />
        <Route path={APP_ROUTES.PERSONA_PREVIEW(':uuid')} exact component={PersonaPreview} />
        <Route path={APP_ROUTES.SPOT_PREVIEW(':uuid')} exact component={SpotPreview} />
        <PrivateRoute path={APP_ROUTES.SPOT_INVITATION(':uuid')} exact component={SpotInvitation} />
        <Route path={APP_ROUTES.MY_PERSONA_PREVIEW(':uuid')} exact component={NavigationPersonaStats} />
        <Route path={APP_ROUTES.MY_SPOT_PREVIEW(':uuid')} exact component={NavigationSpotStats} />
        <Route path={APP_ROUTES.ACTION} exact component={Action} />
        <Route path={APP_ROUTES.PERSONA_FAMILY} exact component={PersonaFamily} />
        <Route path={APP_ROUTES.PERSONA_FAMILY_STEP_2} exact component={PersonaFamilyStep2} />
        <Route path={APP_ROUTES.PERSONA_FAMILY_STEP_3} exact component={PersonaFamilyStep3} />
        <Route path={APP_ROUTES.PERSONA_FAMILY_STEP_4} exact component={PersonaFamilyStep4} />
      </Switch>
    </>
  );
};
