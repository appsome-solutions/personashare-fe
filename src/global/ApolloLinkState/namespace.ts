import { WithTypeName } from 'typings';
import * as Yup from 'yup';

import { ImageRef } from 'components/CropperWidget/CropperWidget';

export const cardSchema = Yup.object({
  name: Yup.string().required(),
  description: Yup.string().required(),
  avatar: Yup.mixed<ImageRef>().nullable(true),
  background: Yup.mixed<ImageRef>().nullable(true),
});

export const pageSchema = Yup.object({
  content: Yup.mixed()
    .required()
    .nullable(true),
  avatar: Yup.mixed<ImageRef>().nullable(true),
  background: Yup.mixed<ImageRef>().nullable(true),
});

export type CardType = Yup.InferType<typeof cardSchema>;

export type PersonaCard = WithTypeName & CardType;

export type PageType = Yup.InferType<typeof pageSchema>;

export type PersonaPage = WithTypeName & PageType;

export type Persona = WithTypeName & {
  uuid: string;
  card: PersonaCard | null;
  page: PersonaPage | null;
};
