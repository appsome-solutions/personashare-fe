import React, { FC, memo } from 'react';
import styled from 'styled-components';
import { Card } from '../../components/Card/Card';
import PSLogo from 'assets/ps_desktop_view.svg';
import StudyImg from 'assets/study.svg';
import CreateImg from 'assets/create.svg';
import { media } from 'global/RWD';
import RoadMap from './RoadMap/RoadMap';
import { TextUppercase } from './TextUppercase';

export const PSDesktopLogo = styled.img.attrs(() => ({
  src: PSLogo,
}))`
  width: 100%;
  max-width: 548px;
`;

export const Study = styled.img.attrs(() => ({
  src: StudyImg,
}))`
  width: 100%;
  max-width: 143px;
  ${media.lg`
     margin-top: 24px
  `}
`;

export const Create = styled.img.attrs(() => ({
  src: CreateImg,
}))`
  width: 100%;
  max-width: 149px;
  ${media.lg`
     margin-top: 24px
  `}
`;

const PreviewWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  padding: 67px 108px;
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CardHolder = styled.div`
  margin-top: 21px;
  display: flex;
  width: 100%;
`;

const CardWithImage = styled(Card)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  min-height: 262px;
  margin-right: 24px;
  padding: 32px;
`;

const DesktopPreview: FC = () => {
  return (
    <PreviewWrapper>
      <Column>
        <PSDesktopLogo />
        <CardHolder>
          <CardWithImage>
            <TextUppercase>I want to read about usage examples</TextUppercase>
            <Study />
          </CardWithImage>
          <CardWithImage>
            <TextUppercase>I want to create my first persona</TextUppercase>
            <Create />
          </CardWithImage>
        </CardHolder>
      </Column>
      <Column>
        <TextUppercase>Share easily and rapidly with anyone</TextUppercase>
        <TextUppercase>be prepared for any situation</TextUppercase>
      </Column>
      <Column>
        <RoadMap />
      </Column>
    </PreviewWrapper>
  );
};

export default memo(DesktopPreview);
