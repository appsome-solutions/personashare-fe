import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { EntityPreviewWrapper } from './EntityPreviewWrapper';
import { AgregatedPersona } from 'global/graphqls/schema';
import { HowMuchPerson } from './HowMuchPerson';
import CheckIn from 'assets/CheckIn.svg';
import { useUserContext } from '../../global/UserContext/UserContext';
import { useMutation } from '@apollo/react-hooks';
import { PARTICIPATE, ParticipateResponse } from '../../global/graphqls/Spot';
import { useParams } from 'react-router-dom';

export interface PropsType {
  gridCardValue: any;
  savedOrRecommend?: string;
  spotsOrPersonsText?: string;
  isWithText?: boolean;
  isWithAddParticipate?: boolean;
}

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
  padding: 16px 0;
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

const AddParticipateStyle = styled.div`
  width: 154px;
  height: 186px;
  box-shadow: 0px 0px 32px rgba(136, 152, 170, 0.15);
  border-radius: 6px;
  background-color: ${(props) => props.theme.colors.main.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ParticipateText = styled.div`
  text-align: left;
  ${(props) => props.theme.typography.body2};
  margin-left: 20px;
`;

export const CardsGrid: FC<PropsType> = ({
  gridCardValue,
  savedOrRecommend,
  spotsOrPersonsText,
  isWithText,
  isWithAddParticipate,
}) => {
  const [limit, setLimit] = useState(4);
  const { uuid } = useParams();
  const [addParticipate] = useMutation<ParticipateResponse>(PARTICIPATE, {
    variables: { spotId: uuid },
  });

  const handleClick = () => {
    const gridCardLength = gridCardValue.length;
    if (limit < gridCardLength) {
      setLimit(limit + 4);
    }
  };

  if (!gridCardValue) return null;

  const CheckEntityList = () => {
    return (
      <>
        {isWithText && (
          <HowMuchPerson
            savedOrRecommend={savedOrRecommend}
            spotsOrPersonsText={spotsOrPersonsText}
            gridCardValue={gridCardValue}
          />
        )}
        <CardStyled>
          {isWithAddParticipate && <ParticipateText>Participant List</ParticipateText>}
          <ComponentWithTable>
            {isWithAddParticipate && (
              <AddParticipateStyle>
                <img src={CheckIn} alt="check in svg" onClick={() => addParticipate()} />
              </AddParticipateStyle>
            )}
            {gridCardValue
              ?.slice(isWithAddParticipate ? 1 : 0, limit)
              .map((spotsOrPersonsText: AgregatedPersona) => (
                <EntityPreviewWrapper
                  visibilityOrNetworkQuery={gridCardValue}
                  key={spotsOrPersonsText.uuid}
                  spotOrPersona={spotsOrPersonsText}
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
