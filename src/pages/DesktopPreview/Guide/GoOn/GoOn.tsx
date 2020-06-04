import React, { FC } from 'react';
import styled from 'styled-components';
import ChatsDotsImg from 'assets/chat_dots.svg';
import { GuideText } from '../Guide';

const TakeYourPhoneImg = styled.img`
  margin-top: 49px;
  margin-bottom: 31px;
`;

export const GoOn: FC = () => (
  <>
    <TakeYourPhoneImg src={ChatsDotsImg} />
    <GuideText>Go on www.personashare.com</GuideText>
  </>
);
