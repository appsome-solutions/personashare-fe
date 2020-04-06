import { gql } from 'apollo-boost';
import { PersonaCard, PersonaPage } from 'global/graphqls/schema';
import { gqlPersona } from './schema';

export type GetPageType = {
  persona: {
    page: PersonaPage;
  };
};

export const GET_PAGE = gql`
  {
    persona @client {
      page {
        background
        avatar
        content
        backgroundUpload
        avatarUpload
      }
    }
  }
`;

export type GetCardType = {
  persona: {
    card: PersonaCard;
  };
};

export const GET_CARD = gql`
  {
    persona @client {
      card {
        name
        description
        avatar
        background
        avatarUpload
        backgroundUpload
      }
    }
  }
`;

export const UPDATE_CARD = gql`
  mutation updateCard($card: Card!) {
    updateCard(card: $card) @client
  }
`;

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
  userPersonas: gqlPersona[];
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
