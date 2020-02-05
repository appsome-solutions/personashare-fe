import { Resolvers } from 'apollo-boost';

import { GET_CARD, GET_PAGE, GET_PERSONA_STEP_PATH } from 'global/graphqls/Persona';

import { Persona, PersonaCard, PersonaPage } from './namespace';

const cardDefaults: PersonaCard = {
  __typename: 'PersonaCard',
  name: '',
  description: '',
  avatar: '',
  background: '',
};

const pageDefaults: PersonaPage = {
  __typename: 'PersonaPage',
  background: '',
  avatar: '',
  content: '',
};

const personaDefaults: Persona = {
  __typename: 'Persona',
  personaStepPath: '',
  card: cardDefaults,
  page: pageDefaults,
  personaUUIDs: [],
};

const personaResolvers: Resolvers = {
  Mutation: {
    changePersonaStepPath: (_, { personaStepPath }: Persona, { cache }) => {
      const previousState = cache.readQuery({ query: GET_PERSONA_STEP_PATH });

      const data = {
        persona: {
          ...previousState.persona,
          personaStepPath,
        },
      };

      cache.writeQuery({
        query: GET_PERSONA_STEP_PATH,
        data,
      });

      return personaStepPath;
    },
    changeCard: (_, { card }: Persona, { cache }) => {
      const previousState = cache.readQuery({ query: GET_CARD });

      const data = {
        persona: {
          ...previousState.persona,
          card,
        },
      };

      cache.writeQuery({
        query: GET_CARD,
        data,
      });

      return card;
    },
    changePage: (_, { page }: Persona, { cache }) => {
      const previousState = cache.readQuery({ query: GET_PAGE });

      const data = {
        persona: {
          ...previousState.persona,
          page,
        },
      };

      cache.writeQuery({
        query: GET_PAGE,
        data,
      });

      return page;
    },
  },
};

export { personaDefaults, personaResolvers };
