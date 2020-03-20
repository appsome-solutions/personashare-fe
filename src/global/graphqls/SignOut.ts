import { gql } from 'apollo-boost';

export interface SignOutResponse {
  logout: boolean;
}

export const SIGN_OUT = gql`
  mutation logout {
    logout
  }
`;
