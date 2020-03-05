import { PersonaCard, PersonaPage } from 'global/ApolloLinkState/namespace';

export type gqlPersona = {
  uuid: string;
  card: PersonaCard | null;
  page: PersonaPage | null;
  personaUUIDs: string[];
  qrCodeLink: string;
};

export type gqlUser = {
  uuid: string;
  name: string;
  email: string;
  photo: string;
  personaUUIDs: string[];
  defaultPersona: string;
};
