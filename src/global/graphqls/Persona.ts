import { gql } from 'apollo-boost';
import { PersonaCard, PersonaPage } from 'global/ApolloLinkState/namespace';

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
