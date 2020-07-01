import React, { FC } from 'react';
import styled from 'styled-components';
import DeviceMobileImg from 'assets/device_mobile.svg';
import { GuideText } from '../Guide';
import { useTranslation } from 'react-i18next';

const TakeYourPhoneImg = styled.img`
  margin-top: 49px;
  margin-bottom: 31px;
`;

export const TakeYourPhone: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <TakeYourPhoneImg src={DeviceMobileImg} />
      <GuideText>{t('TAKE_YOUR_PHONE')}</GuideText>
    </>
  );
};
