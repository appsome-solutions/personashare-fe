import { WithTypeName } from 'typings';
import * as Yup from 'yup';

import { ImageRef } from 'components/CropperWidget/CropperWidget';

export const cardSchema = Yup.object({
  name: Yup.string().required(),
  description: Yup.string().notRequired(),
  avatar: Yup.string().notRequired(),
  background: Yup.string().required(),
  avatarUpload: Yup.mixed<ImageRef>()
    .nullable(true)
    .notRequired(),
  backgroundUpload: Yup.mixed<ImageRef>()
    .nullable(true)
    .notRequired(),
});

export const pageSchema = Yup.object({
  content: Yup.mixed()
    .required()
    .nullable(true),
  avatar: Yup.string().notRequired(),
  background: Yup.string().notRequired(),
  avatarUpload: Yup.mixed<ImageRef>()
    .nullable(true)
    .notRequired(),
  backgroundUpload: Yup.mixed<ImageRef>()
    .nullable(true)
    .notRequired(),
});

export type CardType = Yup.InferType<typeof cardSchema>;

export type PersonaCard = WithTypeName & CardType;

export type PageType = Yup.InferType<typeof pageSchema>;

export type PersonaPage = WithTypeName & PageType;

export type Persona = WithTypeName & {
  uuid: string;
  card: PersonaCard;
  page: PersonaPage;
};

export type gqlPersona = {
  personaUUIDs: string[];
  qrCodeLink: string;
} & Persona;

export type gqlUser = {
  uuid: string;
  email: string;
  photo: string;
  personaUUIDs: string[];
  defaultPersona: string;
};
