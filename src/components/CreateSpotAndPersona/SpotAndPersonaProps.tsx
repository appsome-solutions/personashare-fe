import React, { FC } from 'react';
import styled from 'styled-components';

export interface CreateSpotStep1Props {
  svgLink?: string;
  title?: string;
  content?: string;
}

const Title = styled.h4`
  color: ${(props) => props.theme.colors.main.primary};
  ${(props) => props.theme.typography.subtitle1};
`;

const CardWithText = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.utils.background.light};
  padding: 20px 20px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
`;

const ContentTitle = styled.div`
  color: ${(props) => props.theme.colors.utils.text.dark};
  ${(props) => props.theme.typography.subtitle2};
`;

const MainBoxStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ImgAboveContent = styled.img`
  margin: 40px 0 20px 0;
`;

export const SpotAndPersona: FC<CreateSpotStep1Props> = ({ title, content, svgLink }) => {
  return (
    <MainBoxStyled>
      <ImgAboveContent src={svgLink} />
      <CardWithText>
        <Title>{title}</Title>
        <ContentTitle>{content}</ContentTitle>
      </CardWithText>
    </MainBoxStyled>
  );
};
