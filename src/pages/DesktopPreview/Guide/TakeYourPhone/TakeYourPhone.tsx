import React, { FC } from 'react';
import styled from 'styled-components';
import DeviceMobileImg from 'assets/device_mobile.svg';
import { GuideText } from '../Guide';

const TakeYourPhoneImg = styled.img`
  margin-top: 49px;
  margin-bottom: 31px;
`;

export const TakeYourPhone: FC = () => (
  <>
    <TakeYourPhoneImg src={DeviceMobileImg} />
    <GuideText>Take your phone</GuideText>
  </>
);
