import React, { FC, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Redirect } from 'react-router-dom';
import { isEqual } from 'lodash';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { Node } from 'slate/dist';

import { CREATE_PERSONA, GET_CARD, GET_PAGE, GetCardType, GetPageType } from 'global/graphqls/Persona';
import { cardDefaults } from 'global/ApolloLinkState/persona';
import { useFirebase } from 'global/Firebase';
import { useStorage } from 'global/Storage';

import { TopNav } from 'components/TopNav/TopNav';
import { PageWrapperSpaceBetween } from 'components/PageWrapper';
import { WideButton } from 'components/Button';
import { pageSchema, PageType, Persona } from 'global/graphqls/schema';
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
import { Editor } from 'components/Editor/Editor';

import { onAvatarChangeHelper, onBgChangeHelper, formUploadMapper, revokeObjectURLS } from '../helpers';
import { AssetBlob, AssetType, getUrl, uploadAssets } from './uploadAssets';

const pageInitialValues: PageType = {
  content: null,
  avatar: '',
  background: '',
  avatarUpload: null,
  backgroundUpload: null,
};

const initialState: ImageRef = {
  blobUrl: '',
  fieldName: '',
  blob: null,
};

export const CreatePage: FC = () => {
  const { getCurrentUser } = useFirebase();
  const { storageRef } = useStorage();
  const history = useHistory();

  const { data } = useQuery<GetPageType>(GET_PAGE);
  const card = useQuery<GetCardType>(GET_CARD);
  const [createPersona] = useMutation<Persona>(CREATE_PERSONA);

  const [imageRef, setImageRef] = useState<ImageRef>(initialState);

  const initialValues = data?.persona?.page || pageInitialValues;
  const { values, setFieldValue, handleSubmit, errors, isValid, setStatus, setSubmitting, isSubmitting } = useFormik<
    PageType
  >({
    initialValues,
    onSubmit: async (formValues): Promise<void> => {
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

      if (card?.data) {
        const { name, description, avatarUpload, backgroundUpload } = card.data.persona.card;
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

        await createPersona({
          variables: {
            payload,
          },
        });

        const urls = [
          avatarUpload?.blobUrl,
          backgroundUpload?.blobUrl,
          formValues?.avatarUpload?.blobUrl,
          formValues?.backgroundUpload?.blobUrl,
        ];
        revokeObjectURLS(urls);

        // redirect to personas carouse view
        history.push('/choose-persona');
      }
    },
    validationSchema: pageSchema,
  });

  if (card?.data && isEqual(cardDefaults, card.data.persona.card)) {
    return <Redirect to="/createpersona/card" />;
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

  const onEditorValueChange = (value: Node[]): void => {
    setFieldValue('content', value, true);
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
          <Stepper items={[1, 2, 3]} current={3} mb={31} />
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
            <Flex mt={10}>
              <Editor hasError={!!errors.content} onChange={onEditorValueChange} />
            </Flex>
          </form>
        </div>
        <WideButton htmlType="submit" form="page-form" disabled={!isValid}>
          Create Persona
        </WideButton>
      </PageWrapperSpaceBetween>
      <CropperWidget imageRef={imageRef} onCrop={onCrop} />
    </div>
  );
};
