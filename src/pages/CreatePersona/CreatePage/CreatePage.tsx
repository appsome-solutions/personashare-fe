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
import { pageSchema, PageType, Persona } from 'global/ApolloLinkState/namespace';
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

import { onAvatarChangeHelper, onBgChangeHelper } from '../helpers';
import { AssetBlob, AssetType, getUrl, uploadAssets } from './uploadAssets';

const pageInitialValues: PageType = {
  content: null,
  avatar: null,
  background: null,
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

  const initialValues = data ? data.persona.page : pageInitialValues;
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

      if (card && card.data) {
        const { name, description, avatar, background } = card.data.persona.card;
        const uid = user.uid;
        const assetsBlobs: AssetBlob[] = [
          {
            name: `card_${uid}_${avatar?.fieldName}.jpg`,
            blob: avatar?.blob || null,
            metaData: { customMetadata: { assetType: AssetType.CARD_AVATAR } },
          },
          {
            name: `card_${uid}_${background?.fieldName}.jpg`,
            blob: background?.blob || null,
            metaData: { customMetadata: { assetType: AssetType.CARD_BACKGROUND } },
          },
          {
            name: `page_${uid}_${formValues?.avatar?.fieldName}.jpg`,
            blob: formValues?.avatar?.blob || null,
            metaData: { customMetadata: { assetType: AssetType.PAGE_AVATAR } },
          },
          {
            name: `page_${uid}_${formValues?.background?.fieldName}.jpg`,
            blob: formValues?.background?.blob || null,
            metaData: { customMetadata: { assetType: AssetType.PAGE_BACKGROUND } },
          },
        ];

        const uploadedAssets = await uploadAssets(storageRef, uid, assetsBlobs);

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

        // redirect to personas carouse view
        history.push('/personas');
      }
    },
    validationSchema: pageSchema,
  });

  if (card && card.data && isEqual(cardDefaults, card.data.persona.card)) {
    return <Redirect to="/createpersona/card" />;
  }

  const onCrop = (data: ImageRef): void => {
    setFieldValue(data.fieldName, data, true);
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

  const { avatar, background } = values;

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
              <BackgroundPlaceholder background={background?.blobUrl || ''} alt="Card background">
                <FileInput onFileChange={onBgChange} name="background" id="background" accept="image/*" />
                <PersonaCircleWrapper>
                  <PersonaCircle avatar={avatar?.blobUrl || ''} alt="Avatar card" onAvatarSet={onAvatarChange} />
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
