import React, { ChangeEvent, FC, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';

import { GET_CARD, GetCardType, UPDATE_CARD } from 'global/graphqls/Persona';

import { TopNav } from 'components/TopNav/TopNav';
import { WideButton } from 'components/Button/WideButton';
import { PageWrapperSpaceBetween } from 'components/PageWrapper';
import { InfoCard } from 'components/InfoCard/InfoCard';
import { CardType, cardSchema } from 'global/ApolloLinkState/namespace';
import { Card } from 'components/Card/Card';
import { BackgroundPlaceholder } from 'components/BackgroundPlaceholder/BackgroundPlaceholder';
import { PersonaCircle, PersonaCircleWrapper } from 'components/PersonaCircle/PersonaCircle';
import { Flex } from 'components/FlexBox/FlexBox';
import { FileInput } from 'components/FileInput/FileInput';
import { CropperWidget, ImageRef } from 'components/CropperWidget/CropperWidget';
import { Stepper } from 'components/Stepper';

import { CardBody, CardDescription, CardName, EditButton } from './CreateCard.styles';

const cardInitialValues: CardType = {
  name: '',
  description: '',
  avatar: '',
  background: '',
};

const initialState: ImageRef = {
  blobUrl: '',
  fieldName: '',
  blob: null,
};

export const CreateCard: FC = () => {
  const [updateCard] = useMutation<GetCardType>(UPDATE_CARD);
  const { data } = useQuery<GetCardType>(GET_CARD);
  const [imageRef, setImageRef] = useState<ImageRef>(initialState);
  const history = useHistory();
  const initialValues = data ? data.persona.card : cardInitialValues;

  const { values, setFieldValue, handleSubmit, errors, isValid } = useFormik<CardType>({
    initialValues,
    onSubmit: formValues => {
      updateCard({
        variables: {
          card: formValues,
        },
      }).then(() => {
        history.push({
          pathname: 'page',
        });
      });
    },
    validationSchema: cardSchema,
  });

  const { name, description, avatar, background } = values;

  const onAvatarChange = (avatarFile: File): void => {
    setImageRef({
      blobUrl: URL.createObjectURL(avatarFile),
      fieldName: 'avatar',
      blob: avatarFile,
      minCropBoxHeight: 42,
      aspectRatio: 1,
    });
  };

  const onBgChange = (bgFile: File): void => {
    setImageRef({
      blobUrl: URL.createObjectURL(bgFile),
      fieldName: 'background',
      blob: bgFile,
      minCropBoxHeight: 154,
      aspectRatio: (window.innerWidth - 32) / 154,
    });
  };

  const onCrop = (data: ImageRef): void => {
    setFieldValue(data.fieldName, URL.createObjectURL(data.blob), true);
    setImageRef(initialState);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFieldValue('name', e.target.value, true);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFieldValue('description', e.target.value, true);
  };

  return (
    <div>
      <TopNav isWithBackArrow />
      <PageWrapperSpaceBetween>
        <form onSubmit={handleSubmit}>
          <Stepper items={[1, 2, 3]} current={2} mb={31} />
          <InfoCard title="Edit Your card">
            Cards are small preview of your agregated set of data. It consists from background image, avatar, name and
            short description.
          </InfoCard>
          <Card mt={31} mb={40} position="relative">
            <BackgroundPlaceholder background={background} alt="Card background">
              <FileInput onFileChange={onBgChange} name="background" id="background" accept="image/*" />
              <PersonaCircleWrapper>
                <PersonaCircle avatar={avatar} alt="Avatar card" onAvatarSet={onAvatarChange} />
              </PersonaCircleWrapper>
            </BackgroundPlaceholder>
            <Flex justifyContent="flex-end" mr={14} ml={14} mt={10}>
              <EditButton alt="Edit card" />
            </Flex>
            <CardBody>
              <CardName
                id="name"
                name="name"
                value={name}
                onChange={handleNameChange}
                placeholder="Your Name"
                tabIndex={0}
                hasError={!!errors.name}
              />
              <CardDescription
                id="description"
                name="description"
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Your short description"
                tabIndex={0}
                hasError={!!errors.description}
              />
            </CardBody>
          </Card>
          <WideButton htmlType="submit" disabled={!isValid}>
            Next Step
          </WideButton>
        </form>
      </PageWrapperSpaceBetween>
      <CropperWidget imageRef={imageRef} onCrop={onCrop} />
    </div>
  );
};
