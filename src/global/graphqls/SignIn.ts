import { gql } from 'apollo-boost';

export interface SignInResponse {
  loginUser: {
    accessToken: string;
  };
}

export const SIGN_IN = gql`
  mutation loginUser($idToken: String!) {
    loginUser(idToken: $idToken) {
      accessToken
    }
  }
`;
