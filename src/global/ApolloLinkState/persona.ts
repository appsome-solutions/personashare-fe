import { Resolvers } from 'apollo-boost';

import { GET_CARD, GET_PAGE } from 'global/graphqls/Persona';

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
  card: cardDefaults,
  page: pageDefaults,
  personaUUIDs: [],
};

const personaResolvers: Resolvers = {
  Mutation: {
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

export { personaDefaults, personaResolvers, pageDefaults, cardDefaults };
