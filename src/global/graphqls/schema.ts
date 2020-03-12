import { PersonaCard, PersonaPage } from 'global/ApolloLinkState/namespace';

export type gqlPersona = {
  uuid: string;
  card: PersonaCard;
  page: PersonaPage;
  personaUUIDs: string[];
  qrCodeLink: string;
};

export type gqlUserResponse = {
  user: gqlUser;
};

export type gqlUser = {
  uuid: string;
  email: string;
  photo: string;
  personaUUIDs: string[];
  defaultPersona: string;
};
