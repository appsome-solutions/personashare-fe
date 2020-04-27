import React, { FC } from 'react';
import styled from 'styled-components';
import LogoInTerms from 'assets/LogoInTerms.svg';

export type RegulationsProps = {
  contentName: string;
  articleText?: string;
  numberOfArticle?: string;
  textInRegulation: string;
};

const MainComponent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 16px 26px;
  ${props => props.theme.typography.subtitle2};
  text-align: center;
  height: 100vh;
`;

const RegulationText = styled.div`
  margin-bottom: 16px;
  text-decoration: underline;
`;

const ArticleText = styled.div`
  margin-bottom: 8px;
`;
const TextInRegulation = styled.div`
  white-space: pre-wrap;
  margin-bottom: 8px;
`;

const NumberArticle = styled.div`
  margin-bottom: 4px;
`;

export const RegulationsCards: FC<RegulationsProps> = ({
  contentName,
  articleText,
  textInRegulation,
  numberOfArticle,
}) => (
  <MainComponent>
    <img src={LogoInTerms} alt="Logo In Terms" />
    <RegulationText>
      <b>{contentName}</b>
    </RegulationText>
    <ArticleText>{articleText}</ArticleText>
    <NumberArticle>{numberOfArticle}</NumberArticle>
    <TextInRegulation>{textInRegulation}</TextInRegulation>
    [...]
  </MainComponent>
);
