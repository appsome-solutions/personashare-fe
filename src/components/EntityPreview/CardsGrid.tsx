import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { EntityPreviewWrapper } from './EntityPreviewWrapper';
import { AgregatedPersona } from 'global/graphqls/schema';

export interface PropsType {
  gridCardValue: any;
  savedOrRecommend: string;
  spotsOrPersonsText: string;
  link: any;
}

const HowManyUsers = styled.div`
  ${(props) => props.theme.typography.body1}
`;

const SeeMoreText = styled.a`
  text-decoration-line: underline;
  text-align: center;
`;

const CardStyled = styled.div`
  margin-top: 20px;
  text-align: center;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.utils.background.light};
`;

const ComponentWithTable = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
`;

const SeeMoreStyled = styled.div`
  margin-bottom: 20px;
`;

export const CardsGrid: FC<PropsType> = ({ gridCardValue, savedOrRecommend, spotsOrPersonsText, link }) => {
  const [limit, setLimit] = useState(4);

  const handleClick = () => {
    const gridCardLength = gridCardValue.length;
    if (limit < gridCardLength) {
      setLimit(limit + 4);
    }
  };

  const CheckEntityList = () => {
    if (!gridCardValue) {
      return (
        <HowManyUsers>
          0 {spotsOrPersonsText} {savedOrRecommend} your profile
        </HowManyUsers>
      );
    }

    return (
      <>
        {gridCardValue && (
          <HowManyUsers>
            {gridCardValue.length} {spotsOrPersonsText} {savedOrRecommend} your profile
          </HowManyUsers>
        )}
        <CardStyled>
          <ComponentWithTable>
            {gridCardValue?.slice(0, limit).map((spotsOrPersonsText: AgregatedPersona) => (
              <EntityPreviewWrapper
                visibilityOrNetworkQuery={gridCardValue}
                key={spotsOrPersonsText.uuid}
                spotOrPersona={spotsOrPersonsText}
                link={link}
              />
            ))}
          </ComponentWithTable>
          {gridCardValue.length > 4 && limit < gridCardValue.length && (
            <SeeMoreStyled>
              <SeeMoreText onClick={handleClick}>SEE MORE</SeeMoreText>
            </SeeMoreStyled>
          )}
        </CardStyled>
      </>
    );
  };

  return <CheckEntityList />;
};
