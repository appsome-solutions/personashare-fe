import { WithTypeName } from 'typings';
import * as Yup from 'yup';

import { ImageRef } from 'components/CropperWidget/CropperWidget';

export const cardSchema = Yup.object({
  name: Yup.string().required(),
  description: Yup.string().notRequired(),
  avatar: Yup.string().notRequired(),
  background: Yup.string().notRequired(),
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

export type EntityCard = WithTypeName & CardType;

export type PageType = Yup.InferType<typeof pageSchema>;

export type EntityPage = WithTypeName & PageType;

export type Entity = WithTypeName & {
  uuid: string;
  card: EntityCard;
  page: EntityPage;
};

export type gqlEntity = {
  personaUUIDs: string[];
  qrCodeLink: string;
} & Entity;

export type gqlUser = {
  uuid: string;
  email: string;
  photo: string;
  personaUUIDs: string[];
  defaultPersona: string;
};

export type SpotType = {
  uuid: string;
  card: EntityCard;
  page: EntityPage;
};

export type PersonaType = {
  uuid: string;
  card: EntityCard;
  page: EntityPage;
};
