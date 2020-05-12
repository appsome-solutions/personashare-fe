import { gql } from 'apollo-boost';
import { gqlUser } from './schema';

export interface SignInResponse {
  loginUser: {
    user: gqlUser;
  };
}

export const SIGN_IN = gql`
  mutation loginUser($idToken: String!) {
    loginUser(idToken: $idToken) {
      user {
        uuid
        email
        photo
        personaUUIDs
        defaultPersona
      }
    }
  }
`;
