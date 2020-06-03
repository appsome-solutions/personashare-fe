import React, { FC, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { isEqual } from 'lodash';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useFirebase } from 'global/Firebase';
import { useStorage } from 'global/Storage';
import { TopNav } from 'components/TopNav/TopNav';
import { PageWrapperSpaceBetween } from 'components/PageWrapper';
import { WideButton } from 'components/Button';
import { CardType, Entity, EntityCard, pageSchema, PageType } from 'global/graphqls/schema';
import { Stepper } from 'components/Stepper';
import { InfoCard } from 'components/InfoCard/InfoCard';
import { FileInput } from 'components/FileInput/FileInput';
import { PersonaCircle, PersonaCircleWrapper } from 'components/PersonaCircle/PersonaCircle';
import { BackgroundPlaceholder } from 'components/BackgroundPlaceholder/BackgroundPlaceholder';
import { CropperWidget, ImageRef } from 'components/CropperWidget/CropperWidget';
import { Flex } from 'components/FlexBox/FlexBox';
import { Spinner } from 'components/Spinner/Spinner';
import { Overlay } from 'components/Overlay/Overlay';
import { EditIndicator } from 'components/EditIndicator/EditIndicator';

import {
  onAvatarChangeHelper,
  onBgChangeHelper,
  formUploadMapper,
  revokeObjectURLS,
} from 'pages/CreatePersona/helpers';
import { AssetBlob, AssetType, getUrl, uploadAssets } from './uploadAssets';
import { ExecutionResult } from 'graphql';

export interface LinkProps {
  previousStepPath: string;
  nameSpotOrPersona: string;
  nextStepPath: string;
  initialValues: PageType;
  card: EntityCard;
  cardDefault: object;
  CreateOrSave: string;
  stepperNumbers: number[];
  currentNumber: number;
  onPageSubmitCreateOrUpdate?: (arg: {
    variables: {
      payload: {
        card: CardType;
        page: PageType;
      };
      uuid: string | undefined;
    };
  }) => Promise<ExecutionResult<Entity>>;
}

const initialState: ImageRef = {
  blobUrl: '',
  fieldName: '',
  blob: null,
};

export const EntityPage: FC<LinkProps> = ({
  previousStepPath,
  nameSpotOrPersona,
  nextStepPath,
  initialValues,
  card,
  cardDefault,
  CreateOrSave,
  onPageSubmitCreateOrUpdate,
  stepperNumbers,
  currentNumber,
}) => {
  const { getCurrentUser } = useFirebase();
  const { storageRef } = useStorage();
  const { uuid } = useParams();
  const history = useHistory();
  const [imageRef, setImageRef] = useState<ImageRef>(initialState);
  const { values, setFieldValue, handleSubmit, isValid, setStatus, setSubmitting, isSubmitting } = useFormik<PageType>({
    initialValues,
    onSubmit: async (formValues): Promise<void | null> => {
      const user = getCurrentUser();

      if (!user) {
        setStatus('NO_USER');
        setSubmitting(false);
        return;
      }

      if (!storageRef) {
        setStatus('NO_STORAGE_REF');
        setSubmitting(false);
        return;
      }

      const { name, description, avatarUpload, backgroundUpload } = card;
      const timestamp = Date.now();
      const assetsBlobs: AssetBlob[] = [
        {
          name: `card_${timestamp}_${avatarUpload?.fieldName}.jpg`,
          blob: avatarUpload?.blob || null,
          metaData: { customMetadata: { assetType: AssetType.CARD_AVATAR } },
        },
        {
          name: `card_${timestamp}_${backgroundUpload?.fieldName}.jpg`,
          blob: backgroundUpload?.blob || null,
          metaData: { customMetadata: { assetType: AssetType.CARD_BACKGROUND } },
        },
        {
          name: `page_${timestamp}_${formValues?.avatarUpload?.fieldName}.jpg`,
          blob: formValues?.avatarUpload?.blob || null,
          metaData: { customMetadata: { assetType: AssetType.PAGE_AVATAR } },
        },
        {
          name: `page_${timestamp}_${formValues?.backgroundUpload?.fieldName}.jpg`,
          blob: formValues?.backgroundUpload?.blob || null,
          metaData: { customMetadata: { assetType: AssetType.PAGE_BACKGROUND } },
        },
      ];

      const uploadedAssets = await uploadAssets(storageRef, user.uid, assetsBlobs);

      const payload = {
        card: {
          name,
          description,
          avatar: getUrl(uploadedAssets, AssetType.CARD_AVATAR),
          background: getUrl(uploadedAssets, AssetType.CARD_BACKGROUND),
        },
        page: {
          avatar: getUrl(uploadedAssets, AssetType.PAGE_AVATAR),
          background: getUrl(uploadedAssets, AssetType.PAGE_BACKGROUND),
          content: JSON.stringify(formValues.content),
        },
      };
      if (!onPageSubmitCreateOrUpdate) {
        return null;
      }
      await onPageSubmitCreateOrUpdate({
        variables: {
          payload,
          uuid,
        },
      });

      const urls = [
        avatarUpload?.blobUrl,
        backgroundUpload?.blobUrl,
        formValues?.avatarUpload?.blobUrl,
        formValues?.backgroundUpload?.blobUrl,
      ];
      revokeObjectURLS(urls);
      history.push(nextStepPath);
    },
    validationSchema: pageSchema,
  });

  if (card && isEqual(cardDefault, card)) {
    return <Redirect to={previousStepPath} />;
  }

  const onCrop = (data: ImageRef): void => {
    setFieldValue(data.fieldName, data, true);
    setFieldValue(formUploadMapper[data.fieldName], data?.blobUrl, true);
    setImageRef(initialState);
  };

  const onAvatarChange = (avatarFile: File): void => {
    onAvatarChangeHelper(avatarFile, setImageRef);
  };

  const onBgChange = (bgFile: File): void => {
    onBgChangeHelper(bgFile, setImageRef);
  };

  const { avatarUpload, backgroundUpload } = values;

  return (
    <div>
      <TopNav isWithBackArrow />
      {isSubmitting && (
        <Overlay>
          <Spinner />
        </Overlay>
      )}
      <PageWrapperSpaceBetween>
        <div>
          <Stepper items={stepperNumbers} current={currentNumber} mb={31} />
          <InfoCard title="Edit your page" mb={31}>
            Pages are fully predefined set of data you want to share with others. You can edit it however you want to.
          </InfoCard>
          <form id="page-form" onSubmit={handleSubmit}>
            <div>
              <BackgroundPlaceholder background={backgroundUpload?.blobUrl || ''} alt="Card background">
                <FileInput onFileChange={onBgChange} name="backgroundUpload" id="background" accept="image/*" />
                <PersonaCircleWrapper>
                  <PersonaCircle avatar={avatarUpload?.blobUrl || ''} alt="Avatar card" onAvatarSet={onAvatarChange} />
                </PersonaCircleWrapper>
              </BackgroundPlaceholder>
            </div>
            <Flex justifyContent="flex-end" mx={14} my={10}>
              <EditIndicator alt="Edit card" />
            </Flex>
            <Flex mt={10}></Flex>
          </form>
        </div>
        <WideButton htmlType="submit" form="page-form" disabled={!isValid}>
          {CreateOrSave} {nameSpotOrPersona}
        </WideButton>
      </PageWrapperSpaceBetween>
      <CropperWidget imageRef={imageRef} onCrop={onCrop} />
    </div>
  );
};
