import React, { FC, useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { isEqual, omit } from 'lodash';
import { useFormik } from 'formik';
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
import QuillEditor from 'components/QuillEditor/QuillEditor';
import {
  formUploadMapper,
  onAvatarChangeHelper,
  onBgChangeHelper,
  revokeObjectURLS,
} from 'pages/CreatePersona/helpers';
import { AssetBlob, AssetType, getUrls, uploadAssets } from './uploadAssets';
import { ExecutionResult } from 'graphql';
import { UploadAssetsProps } from 'components/UploadAssets/UploadAssets';
import { InvitationsProps } from 'components/SpotBook/ManagerList/EditModeManager';
import { useMutation } from '@apollo/react-hooks';
import { CLEAR_CARD, GetCardType } from 'global/graphqls/SpotAndPersona';
import { UploadFile } from 'antd/es/upload/interface';
import styled from 'styled-components';
import { StickyNavigation } from '../../../global/Layouts/StickyNavigation/StickyNavigation';

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
  infoBody: string;
  titleCard: string;
  fileList?: UploadFile[];
  onPageSubmitCreateOrUpdate?: (arg: {
    variables: {
      payload: {
        card: CardType;
        page: PageType;
      };
      uuid: string | undefined;
    };
  }) => Promise<
    ExecutionResult<
      { updatePersona: Entity } | { updateSpot: Entity } | { createPersona: Entity } | { createSpot: Entity }
    >
  >;
}

const initialState: ImageRef = {
  blobUrl: '',
  fieldName: '',
  blob: null,
};

type UploadAssetsState = {
  [name: string]: AssetBlob;
};

const StyledBackgroundPlaceholder = styled(BackgroundPlaceholder)`
  margin: 36px 0 40px 0;
  border-radius: 0;
`;

const StyledPageWrapper = styled(PageWrapperSpaceBetween)`
  padding-left: 0;
  padding-right: 0;
  width: auto;
`;

const StyledStepper = styled(Stepper)`
  margin: 0 16px 32px 16px;
  width: auto;
`;

const StyledInfoCard = styled(InfoCard)`
  padding 0 16px;
`;

const StyledWideButton = styled(WideButton)`
  margin-top: 20px;
`;

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
  fileList,
  infoBody,
  titleCard,
}) => {
  const { getCurrentUser } = useFirebase();
  const { storageRef } = useStorage();
  const { uuid } = useParams();
  const history = useHistory();
  const [imageRef, setImageRef] = useState<ImageRef>(initialState);
  const [clearCard, { loading }] = useMutation<GetCardType>(CLEAR_CARD);
  const isSpot = nameSpotOrPersona.toLocaleLowerCase().includes('spot');
  const onSpotCreationOrUpdateArray: Array<(arg0: any, values: any, arg2: any) => void> = [];
  const [userAssetsList, setUserAssetsList] = useState<UploadAssetsState>({});

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

      const uploadedAssets = await uploadAssets(
        storageRef,
        user.uid,
        assetsBlobs.concat(Object.values(userAssetsList))
      );

      const assetsList = uploadedAssets
        .filter((asset) => asset.assetType === AssetType.USER_ASSET)
        .map((asset) => {
          return {
            uid: asset.url,
            url: asset.url,
            thumbUrl: asset.url,
            name: asset.name,
            size: userAssetsList[asset.name].blob?.size,
            status: 'done',
          } as UploadFile;
        })
        .concat((fileList || []).map((file) => omit(file, '__typename')));

      const payload = {
        card: {
          name,
          description,
          avatar: getUrls(uploadedAssets, AssetType.CARD_AVATAR)[0] || card.avatar,
          background: getUrls(uploadedAssets, AssetType.CARD_BACKGROUND)[0] || card.background,
        },
        page: {
          avatar: getUrls(uploadedAssets, AssetType.PAGE_AVATAR)[0] || formValues.avatar,
          background: getUrls(uploadedAssets, AssetType.PAGE_BACKGROUND)[0] || formValues.background,
          content: JSON.stringify(formValues.content),
          fileList: assetsList,
        },
      };

      if (!onPageSubmitCreateOrUpdate) {
        return null;
      }

      const newPageEntityData = await onPageSubmitCreateOrUpdate({
        variables: {
          payload,
          uuid,
        },
      });

      if (isSpot) {
        // @ts-ignore
        const newPageEntity = newPageEntityData?.data?.createSpot || newPageEntityData?.data?.updateSpot;

        await Promise.all(onSpotCreationOrUpdateArray.map((el) => el(newPageEntity, values, setSubmitting)));
      }

      const urls = [
        avatarUpload?.blobUrl,
        backgroundUpload?.blobUrl,
        formValues?.avatarUpload?.blobUrl,
        formValues?.backgroundUpload?.blobUrl,
      ];

      revokeObjectURLS(urls);
      await clearCard();
      history.push(nextStepPath);
    },
    validationSchema: pageSchema,
  });

  if (loading) {
    return <Spinner />;
  }

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

  const onEditorValueChange = (value: string): void => {
    setFieldValue('content', value, true);
  };

  const { avatarUpload, backgroundUpload, content } = values;

  const uploadAssetsProps: UploadAssetsProps = {
    onAddFile: (file) => {
      setUserAssetsList({
        ...userAssetsList,
        [file.name]: {
          name: file.name,
          blob: file,
          metaData: { customMetadata: { assetType: AssetType.USER_ASSET } },
        },
      });
    },
    onRemoveFile: (file) => {
      delete userAssetsList[file.name];
    },
    assetsList: fileList || [],
  };

  const managerListEditModeProps: InvitationsProps = {
    uuid,
    onSpotCreationOrUpdate: (callback) => {
      onSpotCreationOrUpdateArray.push(callback);
    },
  };

  return (
    <div>
      <TopNav isWithBackArrow />
      {isSubmitting && (
        <Overlay>
          <Spinner />
        </Overlay>
      )}
      <StyledPageWrapper>
        <div>
          <StyledStepper items={stepperNumbers} current={currentNumber} mb={31} />
          <StyledInfoCard title={`${titleCard}`}>{infoBody}</StyledInfoCard>
          <form id="page-form" onSubmit={handleSubmit}>
            <div>
              <StyledBackgroundPlaceholder
                background={backgroundUpload?.blobUrl || initialValues.background || ''}
                alt="Card background"
              >
                <FileInput onFileChange={onBgChange} name="backgroundUpload" id="background" accept="image/*" />
                <PersonaCircleWrapper>
                  <PersonaCircle
                    avatar={avatarUpload?.blobUrl || initialValues.avatar || ''}
                    alt="Avatar card"
                    onAvatarSet={onAvatarChange}
                    withFileInput
                  />
                </PersonaCircleWrapper>
              </StyledBackgroundPlaceholder>
            </div>
            <Flex mt={10}>
              <QuillEditor
                onChange={onEditorValueChange}
                initialValue={content}
                uploadAssetsProps={uploadAssetsProps}
                managerListProps={managerListEditModeProps}
                disabledEmbedElements={isSpot ? [] : ['manager-list', 'participant-list']}
              />
            </Flex>
          </form>
        </div>
        <StyledWideButton htmlType="submit" form="page-form" disabled={!isValid}>
          {CreateOrSave} {nameSpotOrPersona}
        </StyledWideButton>
      </StyledPageWrapper>
      <CropperWidget imageRef={imageRef} onCrop={onCrop} />
      <StickyNavigation />
    </div>
  );
};
