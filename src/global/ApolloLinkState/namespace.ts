import { WithTypeName } from 'typings';
import * as Yup from 'yup';

export const cardSchema = Yup.object({
  name: Yup.string().required(),
  description: Yup.string().required(),
  avatar: Yup.string(),
  background: Yup.string(),
});

export type CardType = Yup.InferType<typeof cardSchema>;

export type PersonaCard = WithTypeName & CardType;

export type PersonaPage = WithTypeName & Pick<PersonaCard, 'avatar' | 'background'> & { content: string };

export type Persona = WithTypeName & {
  uuid?: string;
  card: PersonaCard;
  page: PersonaPage;
  personaUUIDs: string[];
};
