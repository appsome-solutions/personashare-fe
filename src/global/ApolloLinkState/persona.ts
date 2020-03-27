import { Resolvers } from 'apollo-boost';

import { GET_CARD, GET_PAGE } from 'global/graphqls/Spot';

import { Persona, PersonaCard, PersonaPage, Spot } from 'global/graphqls/schema';

const cardDefaults: PersonaCard = {
  __typename: 'PersonaCard',
  name: '',
  description: '',
  avatar: '',
  background: '',
  avatarUpload: null,
  backgroundUpload: null,
};

const pageDefaults: PersonaPage = {
  __typename: 'PersonaPage',
  background: '',
  avatar: '',
  content: '',
  avatarUpload: null,
  backgroundUpload: null,
};

const personaDefaults: Persona = {
  __typename: 'Persona',
  card: cardDefaults,
  page: pageDefaults,
  uuid: '',
};
const spotDefaults: Persona = {
  __typename: 'Persona',
  card: cardDefaults,
  page: pageDefaults,
  uuid: '',
};

const personaResolvers: Resolvers = {
  Mutation: {
    updateCard: (_, { card }: Spot, { cache }) => {
      const previousState = cache.readQuery({ query: GET_CARD });

      const data = {
        spot: {
          ...previousState.spot,
          card: {
            ...previousState.spot.card,
            ...card,
          },
        },
      };

      cache.writeQuery({
        query: GET_CARD,
        data,
      });

      return card;
    },
    changePage: (_, { page }: Spot, { cache }) => {
      const previousState = cache.readQuery({ query: GET_PAGE });

      const data = {
        spot: {
          ...previousState.spot,
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

export { personaDefaults, personaResolvers, pageDefaults, cardDefaults, spotDefaults };
