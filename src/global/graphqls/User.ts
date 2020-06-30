import { gql } from 'apollo-boost';

export const GET_USER = gql`
  {
    user {
      uuid
      kind
      email
      photo
      personaUUIDs
      defaultPersona
    }
  }
`;
