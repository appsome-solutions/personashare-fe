import ApolloClient from 'apollo-boost';
import { ErrorHandler } from 'apollo-link-error';
import { GraphQLError } from 'graphql';
import { merge } from 'lodash';
import history from 'global/AppRouter/history';
import { entityDefaults, entityResolvers } from '../ApolloLinkState/spotAndPersona';

//based on: https://www.apollographql.com/docs/react/networking/authentication/
// https://dev.to/rdegges/please-stop-using-local-storage-1i04

export const PS_TOKEN_NAME = 'psToken';

type CustomGraphQLError = Exclude<GraphQLError, 'message'> & {
  message: {
    statusCode: number;
  };
};

const logoutLink: ErrorHandler = error => {
  if ((error?.graphQLErrors as CustomGraphQLError[])?.some(error => error.message.statusCode === 403)) {
    localStorage.setItem(PS_TOKEN_NAME, '');
    history.push('/login');
  }
};

export const client = new ApolloClient({
  clientState: {
    defaults: {
      entity: entityDefaults,
    },
    resolvers: merge(entityResolvers),
  },
  uri: process.env.REACT_APP_GRAPHQL_API_URL || '',
  onError: logoutLink,
  credentials: 'include',
  request: operation => {
    const token = localStorage.getItem(PS_TOKEN_NAME);

    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
});
