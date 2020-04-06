import ApolloClient from 'apollo-boost';
import { merge } from 'lodash';
import { personaDefaults, personaResolvers } from 'global/ApolloLinkState/persona';
//based on: https://www.apollographql.com/docs/react/networking/authentication/
// https://dev.to/rdegges/please-stop-using-local-storage-1i04

export const PS_TOKEN_NAME = 'psToken';

//@ts-ignore
const logoutLink = (error): void => {
  console.warn('link error', error);
  //@ts-ignore
  if (error?.graphQLErrors.some(error => error.message.statusCode === 403)) {
    console.warn('FORBIDDEN!');
    // localStorage.setItem(PS_TOKEN_NAME, '');
  }
};

export const client = new ApolloClient({
  clientState: {
    defaults: {
      persona: personaDefaults,
    },
    resolvers: merge(personaResolvers),
  },
  uri: process.env.REACT_APP_GRAPHQL_API_URL || '',
  //uri: 'http://localhost:3000/graphql',
  credentials: 'same-origin',
  onError: logoutLink,
  request: operation => {
    const token = localStorage.getItem(PS_TOKEN_NAME);

    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
});
