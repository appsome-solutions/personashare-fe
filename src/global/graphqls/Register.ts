import { gql } from 'apollo-boost';

export interface RegisterResponse {
  loginUser: {
    accessToken: string;
  };
}

export const REGISTER = gql`
  mutation registerUser($idToken: String!) {
    registerUser(idToken: $idToken) {
      accessToken
    }
  }
`;
