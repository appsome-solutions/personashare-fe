import { WithTypeName } from 'typings';

export type PersonaCard = WithTypeName & {
  name: string;
  description: string;
  avatar?: string;
  background?: string;
};

export type PersonaPage = WithTypeName & Pick<PersonaCard, 'avatar' | 'background'> & { content: string };

export type Persona = WithTypeName & {
  personaStepPath: string;
  card: PersonaCard | null;
  page: PersonaPage | null;
  personaUUIDs: string[];
};
