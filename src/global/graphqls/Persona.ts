import { gql } from 'apollo-boost';
import { gqlEntity } from './schema';

export const CREATE_PERSONA = gql`
  mutation createPersona($payload: CreateShareableInput!) {
    createPersona(persona: $payload) {
      uuid
      card {
        name
        description
        avatar
        background
      }
      page {
        background
        avatar
        content
      }
    }
  }
`;

export type GetPersonaType = {
  userPersonas: gqlEntity[];
};

export const GET_PERSONAS = gql`
  {
    userPersonas {
      uuid
      card {
        name
        description
        avatar
        background
      }
      page {
        background
        avatar
        content
      }
      personaUUIDs
      qrCodeLink
    }
  }
`;

export interface SetDefaultPersonaResponse {
  setDefaultPersona: {
    uuid: string;
  };
}

export const SET_DEFAULT_PERSONA = gql`
  mutation setDefaultPersona($uuid: String!) {
    setDefaultPersona(uuid: $uuid) {
      uuid
    }
  }
`;

export interface RecommendPersonaResponse {
  recommendPersona: {
    uuid: string;
  };
}

export const RECOMMEND_PERSONA = gql`
  mutation recommendPersona($recommendedPersonaUuid: String!, $personaUuid: String!) {
    recommendPersona(recommendedPersonaUuid: $recommendedPersonaUuid, personaUuid: $personaUuid) {
      uuid
    }
  }
`;

export interface SavePersonaResponse {
  savePersona: {
    uuid: string;
  };
}

export const SAVE_PERSONA = gql`
  mutation savePersona($savedPersonaUuid: String!, $personaUuid: String!) {
    savePersona(savedPersonaUuid: $savedPersonaUuid, personaUuid: $personaUuid) {
      uuid
    }
  }
`;
