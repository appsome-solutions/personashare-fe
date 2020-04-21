import { gql } from 'apollo-boost';
import { EntityCard, gqlEntity } from './schema';

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

export interface SavePersonaResponse {
  savePersona: {
    uuid: string;
  };
}

export const UPDATE_PERSONA = gql`
  mutation updatePersona($uuid: String!, $payload: UpdatePersonaInput!) {
    updatePersona(uuid: $uuid, persona: $payload) {
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

export type GetCardType = {
  persona: {
    card: EntityCard;
  };
};

export const GET_PERSONA_CARD = gql`
  query persona($uuid: String!) {
    persona(uuid: $uuid) {
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

export const UPDATE_PERSONA_CARD = gql`
  mutation updateCard($card: Card!) {
    updateCard(card: $card) @client
  }
`;
