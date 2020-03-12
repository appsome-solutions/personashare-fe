import { gql } from 'apollo-boost';

//no more condition

export const GET_USER = gql`
  query user($condition: UserInput!) {
    user(condition: $condition) {
      uuid
      email
      photo
      personaUUIDs
      defaultPersona
    }
  }
`;
