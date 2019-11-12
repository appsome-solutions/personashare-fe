import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from 'styled-components';

import { CoreTheme } from './global/Themes/CoreTheme';
import { RWDProvider } from './global/RWD';
import { HeaderPageFooter } from './global/Layouts/HeaderPageFooter/HeaderPageFooter';
import { GlobalStyles } from './global/GlobalStyles/GlobalStyles';
import { ErrorHandler } from './global/ErrorHandler/ErrorHandler';
import { AppRouter } from './global/AppRouter/AppRouter';
import { client } from 'global/ApolloClient/ApolloClient';

const App: FunctionComponent = () => (
  <ThemeProvider theme={CoreTheme}>
    <ApolloProvider client={client}>
      <RWDProvider>
        <Router>
          <HeaderPageFooter>
            <GlobalStyles>
              <ErrorHandler>
                <AppRouter />
              </ErrorHandler>
            </GlobalStyles>
          </HeaderPageFooter>
        </Router>
      </RWDProvider>
    </ApolloProvider>
  </ThemeProvider>
);

export default App;
