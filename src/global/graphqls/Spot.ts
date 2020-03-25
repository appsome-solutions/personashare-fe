import { gql } from 'apollo-boost';

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
