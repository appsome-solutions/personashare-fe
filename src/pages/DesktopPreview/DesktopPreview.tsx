import React, { FC, memo, useState } from 'react';
import styled from 'styled-components';
import PSLogo from 'assets/ps_desktop_view.svg';
import StudyImg from 'assets/study.svg';
import CreateImg from 'assets/create.svg';
import { media } from 'global/RWD';
import RoadMap from './RoadMap/RoadMap';
import { TextUppercase } from './TextUppercase';
import { Guide } from './Guide/Guide';

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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 67px 0;
  ${media.xl`
     padding: 67px 108px;
     margin: 0;
     flex-direction: row;
  `}
`;

type ColumnProps = {
  flex?: number;
};

const Column = styled.div<ColumnProps>`
  flex: ${(props) => props.flex || 1};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 534px;
  margin-bottom: 24px;

  ${media.xl`
     margin: 0;
  `}
`;

const CardHolder = styled.div`
  margin-top: 21px;
  display: flex;
  width: 100%;
`;

const CardButton = styled.button`
  border: 0;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  max-width: 255px;
  min-height: 262px;
  margin-right: 24px;
  padding: 32px;
  background-color: ${(props) => props.theme.colors.utils.background.light};
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 4px;

  &:focus {
    outline-color: transparent;
    box-shadow: 0 4px 8px rgba(85, 133, 255, 1);
  }
`;

const DesktopPreview: FC = () => {
  const [overlay, setOverlay] = useState(false);

  return (
    <>
      {overlay && (
        <Guide
          onOutsideClick={() => {
            setOverlay(false);
          }}
        />
      )}
      <PreviewWrapper>
        <Column flex={1}>
          <PSDesktopLogo />
          <CardHolder>
            <CardButton
              onClick={() => {
                setOverlay(true);
              }}
            >
              <TextUppercase>I want to read about usage examples</TextUppercase>
              <Study />
            </CardButton>
            <CardButton
              onClick={() => {
                setOverlay(true);
              }}
            >
              <TextUppercase>I want to create my first persona</TextUppercase>
              <Create />
            </CardButton>
          </CardHolder>
        </Column>
        <Column flex={1}>
          <RoadMap />
        </Column>
      </PreviewWrapper>
    </>
  );
};

export default memo(DesktopPreview);
