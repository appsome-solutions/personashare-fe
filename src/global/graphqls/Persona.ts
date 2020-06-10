import { gql } from 'apollo-boost';
import { AgregatedPersona, gqlEntity } from './schema';

export const CREATE_PERSONA = gql`
  mutation createPersona($payload: CreatePersonaInput!) {
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
        fileList {
          uid
          url
          thumbUrl
          size
          name
          status
        }
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
        fileList {
          uid
          url
          thumbUrl
          size
          name
          status
        }
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
  mutation recommendPersona($recommendedPersonaUuid: String!) {
    recommendPersona(recommendedPersonaUuid: $recommendedPersonaUuid) {
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
  mutation savePersona($savedPersonaUuid: String!) {
    savePersona(savedPersonaUuid: $savedPersonaUuid) {
      uuid
    }
  }
`;

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
        fileList {
          uid
          url
          thumbUrl
          size
          name
          status
        }
      }
      personaUUIDs
      qrCodeLink
    }
  }
`;

export type GetCardType = {
  persona: AgregatedPersona;
  recommendList: AgregatedPersona[];
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

export const GET_PERSONA = gql`
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
        fileList {
          uid
          url
          thumbUrl
          size
          name
          status
        }
      }
      personaUUIDs
      qrCodeLink
      recommendList {
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
      visibilityList {
        uuid
      }
      spotRecommendList {
        uuid
      }
      spotVisibilityList {
        uuid
      }
      contactBook {
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
      spotBook {
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
  }
`;

export interface RemovePersonaResponse {
  removePersona: boolean;
}

export interface RemoveSpotResponse {
  removeSpot: boolean;
}

export const REMOVE_PERSONA = gql`
  mutation removePersona($personaUuid: String!) {
    removePersona(personaUuid: $personaUuid)
  }
`;
