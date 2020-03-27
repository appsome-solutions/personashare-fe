import { gql } from 'apollo-boost';
import { gqlSpot, SpotPage, SpotCard } from './schema';

export interface RecommendSpotResponse {
  recommendSpot: {
    uuid: string;
  };
}

export const RECOMMEND_SPOT = gql`
  mutation recommendSpot($recommendedSpotUuid: String!, $personaUuid: String!) {
    recommendSpot(recommendedSpotUuid: $recommendedSpotUuid, personaUuid: $personaUuid) {
      uuid
    }
  }
`;

export interface ParticipateResponse {
  participate: {
    uuid: string;
  };
}

export const PARTICIPATE = gql`
  mutation participate($personaId: String!, $spotId: String!) {
    participate(personaId: $personaId, spotId: $spotId) {
      uuid
    }
  }
`;

export interface AddManagerResponse {
  addMenager: {
    uuid: string;
  };
}

export const ADD_MENAGER = gql`
  mutation addMenager($personaId: String!, $spotId: String!) {
    addMenager(personaId: $personaId, spotId: $spotId) {
      uuid
    }
  }
`;

export type GetPageType = {
  spot: {
    page: SpotPage;
  };
};

export const GET_PAGE = gql`
  {
    spot @client {
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
  spot: {
    card: SpotCard;
  };
};

export const GET_CARD = gql`
  {
    spot @client {
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

export const CREATE_SPOT = gql`
  mutation createSpot($payload: CreateShareableInput!) {
    createSpot(spot: $payload) {
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

export type GetSpotType = {
  userSpots: gqlSpot[];
};

export const GET_SPOT = gql`
  {
    userSpots {
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
