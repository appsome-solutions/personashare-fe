import { EntityCard, EntityPage } from './schema';
import { gql } from 'apollo-boost';

export type GetPageType = {
  entity: {
    page: EntityPage;
  };
};

export const GET_PAGE = gql`
  {
    entity @client {
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
  entity: {
    card: EntityCard;
  };
};

export const GET_CARD = gql`
  {
    entity @client {
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

export const CLEAR_CARD = gql`
  mutation clearCard {
    clearCard @client
  }
`;
