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
import { EditIndicator } from 'components/EditIndicator/EditIndicator';

import { CardBody, CardDescription, CardName } from './CreateCard.styles';
import { onAvatarChangeHelper, onBgChangeHelper } from '../helpers';

const cardInitialValues: CardType = {
  name: '',
  description: '',
  avatar: null,
  background: null,
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
    onAvatarChangeHelper(avatarFile, setImageRef);
  };

  const onBgChange = (bgFile: File): void => {
    onBgChangeHelper(bgFile, setImageRef);
  };

  const onCrop = (data: ImageRef): void => {
    setFieldValue(data.fieldName, data, true);
    // setFieldValue(mapper[data.fieldName], data.blobUrl, true);
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
            <BackgroundPlaceholder background={background?.blobUrl || ''} alt="Card background">
              <FileInput onFileChange={onBgChange} name="background" id="background" accept="image/*" />
              <PersonaCircleWrapper>
                <PersonaCircle avatar={avatar?.blobUrl || ''} alt="Avatar card" onAvatarSet={onAvatarChange} />
              </PersonaCircleWrapper>
            </BackgroundPlaceholder>
            <Flex justifyContent="flex-end" mx={14} my={10}>
              <EditIndicator alt="Edit card" />
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
