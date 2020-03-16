import { gql } from 'apollo-boost';
import { gqlUser } from './schema';

export interface SignInResponse {
  loginUser: {
    accessToken: string;
    user: gqlUser;
  };
}

export const SIGN_IN = gql`
  mutation loginUser($idToken: String!) {
    loginUser(idToken: $idToken) {
      accessToken
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
