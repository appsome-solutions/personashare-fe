import React, { FC } from 'react';
import styled from 'styled-components';
import ChatsDotsImg from 'assets/chat_dots.svg';
import { GuideText } from '../Guide';
import { useTranslation } from 'react-i18next';

const TakeYourPhoneImg = styled.img`
  margin-top: 49px;
  margin-bottom: 31px;
`;

export const GoOn: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <TakeYourPhoneImg src={ChatsDotsImg} />
      <GuideText>{t('GO_ON')}</GuideText>
    </>
  );
};
