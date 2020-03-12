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
      }
    }
  }
`;

export type GetPersonaType = {
  personas: gqlPersona[];
};

export const GET_PERSONAS = gql`
  {
    personas {
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

export const SET_DEFAULT_PERSONA = gql`
  mutation setDefaultPersona($uuid: String!) {
    setDefaultPersona(uuid: $uuid) {
      uuid
    }
  }
`;
