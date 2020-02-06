import { gql } from 'apollo-boost';
import { WithTypeName } from 'typings';
import { Persona, PersonaCard, PersonaPage } from 'global/ApolloLinkState/namespace';

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

export type GetCurrentStepType = {
  persona: WithTypeName & Pick<Persona, 'personaStepPath'>;
};

export const GET_PERSONA_STEP_PATH = gql`
  query {
    persona @client {
      personaStepPath
    }
  }
`;

export const CHANGE_PERSONA_STEP_PATH = gql`
  mutation changePersonaStepPath($personaStepPath: String!) {
    changePersonaStepPath(personaStepPath: $personaStepPath) @client {
      personaStepPath
    }
  }
`;
