import { gql } from 'apollo-boost';
import {
  AgregatedPersona,
  AgregatedSpot,
  EmailInvitation,
  EntityCard,
  EntityPage,
  gqlEntity,
  UpdateSpotInput,
} from './schema';

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
  participate: AgregatedSpot;
}

export const PARTICIPATE = gql`
  mutation participate($spotId: String!) {
    participate(spotId: $spotId) {
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
      invitedManagerEmails {
        email
        status
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
        page {
          background
          avatar
          content
        }
      }
      participants {
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

export interface AddManagerResponse {
  addMenager: {
    uuid: string;
  };
}

export const ADD_MANAGER = gql`
  mutation addManager($personaId: String!, $spotId: String!, $email: String!) {
    addManager(personaId: $personaId, spotId: $spotId, email: $email) {
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
  mutation updateSpot($uuid: String!, $spot: UpdateSpotInput!) {
    updateSpot(uuid: $uuid, spot: $spot) {
      uuid
      canBeRecommended
      canPersonaParticipate
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
      invitedManagerEmails {
        email
        status
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
        page {
          background
          avatar
          content
        }
      }
      participants {
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

export const UPDATE_SPOT_PAYLOAD = gql`
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

export type SpotType = {
  spot: {
    uuid: string;
    card: EntityCard;
    page: EntityPage;
    personaUUIDs: string[];
    qrCodeLink: string;
    managers: AgregatedPersona[];
    networkList: AgregatedPersona[];
    recommendList: AgregatedPersona[];
    contactBook: AgregatedPersona[];
    visibilityList: AgregatedPersona[];
    owner: AgregatedPersona;
    participants: AgregatedPersona[];
    invitedManagerEmails: EmailInvitation[];
  };
};

export type GetCardType = {
  spot: AgregatedSpot;
  managers: AgregatedSpot[];
  visibilityList: AgregatedSpot[];
  networkList: AgregatedSpot[];
  payload: UpdateSpotInput;
};

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

export const GET_SPOT = gql`
  query spot($uuid: String!) {
    spot(uuid: $uuid) {
      uuid
      canBeRecommended
      canPersonaParticipate
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
      invitedManagerEmails {
        email
        status
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
        page {
          background
          avatar
          content
        }
      }
      participants {
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

export interface CheckOutResponse {
  participate: AgregatedSpot;
  checkOut: AgregatedSpot;
}

export const CHECK_OUT = gql`
  mutation checkOut($spotId: String!) {
    checkOut(spotId: $spotId) {
      uuid
      canBeRecommended
      canPersonaParticipate
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
      invitedManagerEmails {
        email
        status
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
        page {
          background
          avatar
          content
        }
      }
      participants {
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
