import { Resolvers } from 'apollo-boost';

import { Entity, EntityCard, EntityPage } from 'global/graphqls/schema';
import { GET_CARD, GET_PAGE } from 'global/graphqls/SpotAndPersona';

const cardDefaults: EntityCard = {
  __typename: 'EntityCard',
  name: '',
  description: '',
  avatar: '',
  background: '',
  avatarUpload: null,
  backgroundUpload: null,
};

const pageDefaults: EntityPage = {
  __typename: 'EntityPage',
  background: '',
  avatar: '',
  content: '',
  avatarUpload: null,
  backgroundUpload: null,
};

const entityDefaults: Entity = {
  __typename: 'Entity',
  card: cardDefaults,
  page: pageDefaults,
  uuid: '',
};

const entityResolvers: Resolvers = {
  Mutation: {
    updateCard: (_, { card }: Entity, { cache }) => {
      const previousState = cache.readQuery({ query: GET_CARD });

      const data = {
        entity: {
          ...previousState?.entity,
          card: {
            ...previousState?.entity?.card,
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
    changePage: (_, { page }: Entity, { cache }) => {
      const previousState = cache.readQuery({ query: GET_PAGE });

      const data = {
        entity: {
          ...previousState?.entity,
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
export { entityDefaults, entityResolvers, pageDefaults, cardDefaults };
