import { WithTypeName } from 'typings';
import * as Yup from 'yup';

import { ImageRef } from 'components/CropperWidget/CropperWidget';
import { UploadFile } from 'antd/lib/upload/interface';

export const cardSchema = Yup.object({
  name: Yup.string().required(),
  description: Yup.string().required(),
  avatar: Yup.string().notRequired(),
  background: Yup.string().notRequired(),
  avatarUpload: Yup.mixed<ImageRef>().nullable(true).notRequired(),
  backgroundUpload: Yup.mixed<ImageRef>().nullable(true).notRequired(),
});

export const pageSchema = Yup.object({
  content: Yup.mixed().notRequired(),
  avatar: Yup.string().notRequired(),
  background: Yup.string().notRequired(),
  avatarUpload: Yup.mixed<ImageRef>().nullable(true).notRequired(),
  backgroundUpload: Yup.mixed<ImageRef>().nullable(true).notRequired(),
});

export type CardType = Yup.InferType<typeof cardSchema>;

export type EntityCard = WithTypeName & CardType;

export type PageType = Yup.InferType<typeof pageSchema>;

export type EntityPage = WithTypeName & PageType & { fileList?: UploadFile[] };

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
  kind: string;
  email: string;
  photo: string;
  personaUUIDs: string[];
  defaultPersona: string;
};

export type EmailInvitation = {
  email: string;
  status: string;
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
  invitedManagerEmails: EmailInvitation[];
  canPersonaParticipate: boolean;
  canBeRecommended: boolean;
};

export type UpdateSpotInput = {
  card: EntityCard;
  page: EntityPage;
  invitedManagerEmails: string[];
};
