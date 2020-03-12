import { gql } from 'apollo-boost';

export interface SignOutResponse {
  loginUser: {
    accessToken: string;
  };
}

export const SIGN_OUT = gql`
  mutation logout {
    logout
  }
`;
