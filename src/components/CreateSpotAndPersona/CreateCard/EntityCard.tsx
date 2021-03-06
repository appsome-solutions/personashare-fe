import React, { FC, ChangeEvent, useState } from 'react';
import { useFormik } from 'formik';

import { TopNav } from 'components/TopNav/TopNav';
import { WideButton } from 'components/Button/WideButton';
import { PageWrapperSpaceBetween } from 'components/PageWrapper';
import { InfoCard } from 'components/InfoCard/InfoCard';
import { cardSchema, CardType } from 'global/graphqls/schema';
import { Card } from 'components/Card/Card';
import { BackgroundPlaceholder } from 'components/BackgroundPlaceholder/BackgroundPlaceholder';
import { PersonaCircle, PersonaCircleWrapper } from 'components/PersonaCircle/PersonaCircle';
import { Flex } from 'components/FlexBox/FlexBox';
import { FileInput } from 'components/FileInput/FileInput';
import { CropperWidget, ImageRef } from 'components/CropperWidget/CropperWidget';
import { Stepper } from 'components/Stepper';
import { EditIndicator } from 'components/EditIndicator/EditIndicator';

import { CardBody, CardDescription, CardName } from './CreateCard.styles';
import { onAvatarChangeHelper, onBgChangeHelper, formUploadMapper } from 'pages/CreatePersona/helpers';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { StickyNavigation } from '../../../global/Layouts/StickyNavigation/StickyNavigation';

type PropsCard = {
  initialValues: CardType;
  updateCard: Function;
  nextPathName: string;
  stepperNumbers: number[];
  currentNumber: number;
  titleCard: string;
  infoBody: string;
};

const initialState: ImageRef = {
  blobUrl: '',
  fieldName: '',
  blob: null,
};

const CardBodyStyled = styled(CardBody)`
  margin-top: 32px;
`;

export const EntityCard: FC<PropsCard> = ({
  nextPathName,
  stepperNumbers,
  currentNumber,
  updateCard,
  initialValues,
  infoBody,
  titleCard,
}) => {
  const [imageRef, setImageRef] = useState<ImageRef>(initialState);
  const history = useHistory();
  const { t } = useTranslation();

  const { values, setFieldValue, handleSubmit, errors, isValid } = useFormik<CardType>({
    enableReinitialize: true,
    initialValues,
    onSubmit: (formValues: CardType) => {
      updateCard({
        variables: {
          card: formValues,
        },
      }).then(() => {
        history.push({
          pathname: nextPathName,
        });
      });
    },
    validationSchema: cardSchema,
  });

  const { name, description, avatarUpload, backgroundUpload } = values;

  const onAvatarChange = (avatarFile: File): void => {
    onAvatarChangeHelper(avatarFile, setImageRef);
  };

  const onBgChange = (bgFile: File): void => {
    onBgChangeHelper(bgFile, setImageRef);
  };

  const onCrop = (data: ImageRef): void => {
    setFieldValue(data.fieldName, data, true);
    setFieldValue(formUploadMapper[data.fieldName], data?.blobUrl, true);
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
          <Stepper items={stepperNumbers} current={currentNumber} mb={31} />
          <InfoCard title={`${titleCard}`}>{infoBody}</InfoCard>
          <Card mt={31} mb={40} position="relative">
            <BackgroundPlaceholder
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
            </BackgroundPlaceholder>
            <CardBodyStyled>
              <CardName
                id="name"
                name="name"
                value={name}
                onChange={handleNameChange}
                placeholder={t('CREATION_STEP_2_INPUT_1_PLACEHOLDER')}
                tabIndex={0}
                hasError={!!errors.name}
                maxLength={69}
              />
              <CardDescription
                id="description"
                name="description"
                value={description}
                onChange={handleDescriptionChange}
                placeholder={t('CREATION_STEP_2_INPUT_2_PLACEHOLDER')}
                tabIndex={0}
                hasError={!!errors.description}
                maxLength={69}
              />
            </CardBodyStyled>
          </Card>
          <WideButton htmlType="submit" disabled={!isValid}>
            {t('CREATION_STEP_2_NEXT_STEP')}
          </WideButton>
        </form>
      </PageWrapperSpaceBetween>
      <CropperWidget imageRef={imageRef} onCrop={onCrop} />
      <StickyNavigation />
    </div>
  );
};
