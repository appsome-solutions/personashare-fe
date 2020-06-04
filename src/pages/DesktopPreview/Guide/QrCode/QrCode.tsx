import React, { FC } from 'react';
import styled from 'styled-components';
import QrCodeImg from 'assets/QrImg.svg';
import { GuideText } from '../Guide';

const TakeYourPhoneImg = styled.img`
  margin-top: 49px;
  margin-bottom: 31px;
  width: 182px;
`;

//TODO add handling spot/register qr code link

export const QrCode: FC = () => (
  <>
    <TakeYourPhoneImg src={QrCodeImg} />
    <GuideText>Aim the camera at qr code above and join to our unique community!</GuideText>
  </>
);
