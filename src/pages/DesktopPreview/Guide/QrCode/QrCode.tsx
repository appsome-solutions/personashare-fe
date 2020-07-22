import React, { FC } from 'react';
import styled from 'styled-components';
import { GuideText } from '../Guide';
import { useTranslation } from 'react-i18next';

const TakeYourPhoneImg = styled.img`
  margin-top: 49px;
  margin-bottom: 31px;
  width: 182px;
`;

//TODO add handling spot/register qr code link

export const QrCode: FC<{ QrCodeImg: string }> = ({ QrCodeImg }) => {
  const { t } = useTranslation();

  return (
    <>
      <TakeYourPhoneImg src={QrCodeImg} />
      <GuideText>{t('AIM_THE_CAMERA')}</GuideText>
    </>
  );
};
