import { gql } from 'apollo-boost';

export interface SignOutResponse {
  loginUser: {
    accessToken: string;
  };
  logout: boolean;
}

export const SIGN_OUT = gql`
  mutation logout {
    logout
  }
`;
