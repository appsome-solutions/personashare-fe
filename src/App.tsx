import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from 'styled-components';

import { CoreTheme } from './global/Themes/CoreTheme';
import { RWDProvider } from './global/RWD';
import { StickyNavigation } from './global/Layouts/StickyNavigation/StickyNavigation';
import { GlobalStyles } from './global/GlobalStyles/GlobalStyles';
import { ErrorHandler } from './global/ErrorHandler/ErrorHandler';
import { AppRouter } from './global/AppRouter/AppRouter';
import { client } from 'global/ApolloClient/ApolloClient';
import { FirebaseProvider, Firebase } from './global/Firebase';
import { StorageProvider, Storage } from './global/Storage';

const firebase = new Firebase();

const App: FunctionComponent = () => (
  <ThemeProvider theme={CoreTheme}>
    <ApolloProvider client={client}>
      <FirebaseProvider value={firebase}>
        <StorageProvider value={new Storage(firebase.getStorageRef())}>
          <RWDProvider>
            <Router>
              <GlobalStyles />
              <ErrorHandler>
                <AppRouter />
              </ErrorHandler>
              <StickyNavigation />
            </Router>
          </RWDProvider>
        </StorageProvider>
      </FirebaseProvider>
    </ApolloProvider>
  </ThemeProvider>
);

export default App;
