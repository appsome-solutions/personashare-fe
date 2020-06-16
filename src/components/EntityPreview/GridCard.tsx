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

export const GridCard: FC<PropsType> = ({ gridCardValue, savedOrRecommend, spotsOrPersonsText, link }) => {
  const [limit, setLimit] = useState(4);

  const handleClick = () => {
    const gridCardLength = gridCardValue.length;
    const currentLimit = limit;
    if (currentLimit < gridCardLength) {
      setLimit(currentLimit + 4);
    }
  };

  const CheckEntityList = () => {
    return (
      <>
        {!gridCardValue ? (
          <HowManyUsers>
            0 {spotsOrPersonsText} {savedOrRecommend} your profile
          </HowManyUsers>
        ) : (
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
          {gridCardValue?.length > 4 && limit < gridCardValue?.length ? (
            <SeeMoreStyled>
              <SeeMoreText onClick={handleClick}>SEE MORE</SeeMoreText>
            </SeeMoreStyled>
          ) : null}
        </CardStyled>
      </>
    );
  };

  return <CheckEntityList />;
};
