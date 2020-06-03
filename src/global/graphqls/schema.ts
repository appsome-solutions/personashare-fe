import { WithTypeName } from 'typings';
import * as Yup from 'yup';

import { ImageRef } from 'components/CropperWidget/CropperWidget';

export const cardSchema = Yup.object({
  name: Yup.string().required(),
  description: Yup.string().required(),
  avatar: Yup.string().notRequired(),
  background: Yup.string().notRequired(),
  avatarUpload: Yup.mixed<ImageRef>().nullable(true).notRequired(),
  backgroundUpload: Yup.mixed<ImageRef>().nullable(true).notRequired(),
});

export const pageSchema = Yup.object({
  content: Yup.mixed().required().nullable(true),
  avatar: Yup.string().notRequired(),
  background: Yup.string().notRequired(),
  avatarUpload: Yup.mixed<ImageRef>().nullable(true).notRequired(),
  backgroundUpload: Yup.mixed<ImageRef>().nullable(true).notRequired(),
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

export type AgregatedPersona = {
  uuid: string;
  personaUUIDs: string[];
  card: EntityCard;
  page: EntityPage;
  qrCodeLink: string;
  networkList: AgregatedPersona[];
  recommendList: AgregatedPersona[];
  contactBook: AgregatedPersona[];
  visibilityList: AgregatedPersona[];
  spotVisibilityList: AgregatedSpot[];
  spotBook: AgregatedSpot[];
  spotNetworkList: AgregatedSpot[];
  spotRecommendList: AgregatedSpot[];
};

export type AgregatedSpot = {
  uuid: string;
  card: EntityCard;
  page: EntityPage;
  personaUUIDs: string[];
  qrCodeLink: string;
  managers: AgregatedPersona[];
  networkList: AgregatedPersona[];
  recommendList: AgregatedPersona[];
  contactBook: AgregatedPersona[];
  visibilityList: AgregatedPersona[];
  owner: AgregatedPersona;
  participants: AgregatedPersona[];
};
