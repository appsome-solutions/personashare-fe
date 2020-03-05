import { gql } from 'apollo-boost';
import { PersonaCard, PersonaPage, Persona } from 'global/ApolloLinkState/namespace';

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

export type GetPersonaType = {
  personas: Persona[];
};

export const GET_PERSONAS = gql`
  {
    personas: getPersonas {
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
    }
  }
`;
