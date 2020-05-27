import { gql } from 'apollo-boost';
import { AgregatedSpot, gqlEntity } from './schema';

export interface RecommendSpotResponse {
  recommendSpot: {
    uuid: string;
  };
}

export const RECOMMEND_SPOT = gql`
  mutation recommendSpot($recommendedSpotUuid: String!) {
    recommendSpot(recommendedSpotUuid: $recommendedSpotUuid) {
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
  mutation saveSpot($savedSpotUuid: String!) {
    saveSpot(savedSpotUuid: $savedSpotUuid) {
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

export const GET_SPOTS = gql`
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

export const UPDATE_SPOT = gql`
  mutation updateSpot($uuid: String!, $payload: UpdateSpotInput!) {
    updateSpot(uuid: $uuid, spot: $payload) {
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
  spot: AgregatedSpot;
  managers: AgregatedSpot[];
  visibilityList: AgregatedSpot[];
  networkList: AgregatedSpot[];
};

export const GET_SPOT_CARD = gql`
  query spot($uuid: String!) {
    spot(uuid: $uuid) {
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

export const UPDATE_SPOT_CARD = gql`
  mutation updateCard($card: Card!) {
    updateCard(card: $card) @client
  }
`;

export const REMOVE_SPOT = gql`
  mutation removeSpot($spotUuid: String!) {
    removeSpot(spotUuid: $spotUuid)
  }
`;

export const GET_SPOT_PAGE = gql`
  query spot($uuid: String!) {
    spot(uuid: $uuid) {
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

export const GET_SPOT = gql`
  query spot($uuid: String!) {
    spot(uuid: $uuid) {
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
      managers {
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
      networkList {
        uuid
        card {
          name
          description
          avatar
          background
        }
      }
    }
  }
`;
