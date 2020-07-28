import React, { FunctionComponent } from 'react';
import { Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from 'styled-components';
import { TermAndCookies } from 'pages/TermAndCookies/TermAndCookies';
import { CoreTheme } from './global/Themes/CoreTheme';
import { RWDProvider } from './global/RWD';
import { StickyNavigation } from './global/Layouts/StickyNavigation/StickyNavigation';
import { GlobalStyles } from './global/GlobalStyles/GlobalStyles';
import { ErrorHandler } from './global/ErrorHandler/ErrorHandler';
import { AppRouter } from './global/AppRouter/AppRouter';
import { client } from 'global/ApolloClient/ApolloClient';
import { FirebaseProvider, Firebase } from './global/Firebase';
import { StorageProvider, Storage } from './global/Storage';
import { UserProvider } from 'global/UserContext/UserContext';
import history from 'global/AppRouter/history';
import { ResponsiveContentReplacer } from './global/ResponsiveContentReplacer/ResponsiveContentReplacer';
import { ApiErrorsTranslationsProvider } from './global/Firebase/ApiErrorsTranslations/ApiErrorsTranslations';

const firebase = new Firebase();

const App: FunctionComponent = () => (
  <ThemeProvider theme={CoreTheme}>
    <ApolloProvider client={client}>
      <FirebaseProvider value={firebase}>
        <StorageProvider value={new Storage(firebase.getStorageRef())}>
          <UserProvider>
            <RWDProvider>
              <ApiErrorsTranslationsProvider>
                <GlobalStyles />
                <ResponsiveContentReplacer>
                  <Router history={history}>
                    <ErrorHandler>
                      <AppRouter />
                    </ErrorHandler>
                    <TermAndCookies />
                  </Router>
                </ResponsiveContentReplacer>
              </ApiErrorsTranslationsProvider>
            </RWDProvider>
          </UserProvider>
        </StorageProvider>
      </FirebaseProvider>
    </ApolloProvider>
  </ThemeProvider>
);

export default App;
