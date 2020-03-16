import { gql } from 'apollo-boost';

export const GET_USER = gql`
  {
    user {
      uuid
      email
      photo
      personaUUIDs
      defaultPersona
    }
  }
`;
