import { gql } from 'apollo-boost';
import { gqlEntity } from './schema';

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

export interface SaveSpotResponse {
  saveSpot: {
    uuid: string;
  };
}

export const SAVE_SPOT = gql`
  mutation saveSpot($savedSpotUuid: String!, $spotUuid: String!) {
    saveSpot(savedPersonaUuid: $savedSpotUuid, spotUuid: $spotUuid) {
      uuid
    }
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
  userSpots: gqlEntity[];
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
