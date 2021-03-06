import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { EntityPreviewWrapper } from './EntityPreviewWrapper';
import { AgregatedPersona } from 'global/graphqls/schema';
import { HowMuchPerson } from './HowMuchPerson';
import CheckIn from 'assets/CheckIn.svg';
import { useMutation } from '@apollo/react-hooks';
import { CHECK_OUT, CheckOutResponse, GET_SPOT, PARTICIPATE, ParticipateResponse } from '../../global/graphqls/Spot';
import { useParams } from 'react-router-dom';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import checkOutSvg from 'assets/checkOut.svg';
import { useUserContext } from '../../global/UserContext/UserContext';
import { InputIcon } from '../InputIcon/InputIcon';

export interface PropsType {
  gridCardValue: any;
  canPersonaParticipate?: boolean;
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

const CheckOutText = styled.div`
  ${(props) => props.theme.typography.body1};
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.colors.utils.text.light};
  align-items: center;
  justify-content: center;
`;

const InputIconStyle = styled(InputIcon)`
  color: white;
  background-color: white;
`;

export const CardsGrid: FC<PropsType> = ({
  gridCardValue,
  canPersonaParticipate,
  savedOrRecommend,
  spotsOrPersonsText,
  isWithText,
  isWithAddParticipate,
}) => {
  const { user } = useUserContext();
  const [limit, setLimit] = useState(4);
  const { uuid } = useParams();
  const { t } = useTranslation();
  const isDefaultPersona = () => {
    return gridCardValue.uuid !== user?.defaultPersona;
  };
  const [checkOut] = useMutation<CheckOutResponse>(CHECK_OUT, {
    variables: {
      spotId: uuid,
      spot: {
        participants: {
          uuid: gridCardValue?.filter(() => isDefaultPersona()),
        },
      },
    },
    update(cache, { data }) {
      if (!data) {
        return;
      }

      cache.writeQuery({
        query: GET_SPOT,
        variables: {
          uuid,
        },
        data: { spot: data.checkOut },
      });
    },
  });
  const [addParticipate] = useMutation<ParticipateResponse>(PARTICIPATE, {
    variables: { spotId: uuid },
    update(cache, { data }) {
      if (!data) {
        return;
      }

      cache.writeQuery({
        query: GET_SPOT,
        variables: {
          uuid,
        },
        data: { spot: data.participate },
      });
    },
  });

  const handleClick = () => {
    const gridCardLength = gridCardValue.length;
    if (limit < gridCardLength) {
      setLimit(limit + 4);
    }
  };

  const checkInHandler = () => {
    if (!canPersonaParticipate) {
      return message.info(`${t('CARDS_GRID_LIMIT_FREE')}`);
    } else {
      if (_.find(gridCardValue, { uuid: user?.defaultPersona })) return checkOut();
      else {
        return addParticipate();
      }
    }
  };

  const CheckEntityList = () => {
    return (
      <>
        {gridCardValue && isWithText && (
          <HowMuchPerson
            savedOrRecommend={savedOrRecommend}
            spotsOrPersonsText={spotsOrPersonsText}
            gridCardValue={gridCardValue}
          />
        )}
        {
          <CardStyled>
            {isWithAddParticipate && <ParticipateText>{t('PARTICIPANT_LIST_TEXT')}</ParticipateText>}
            <ComponentWithTable>
              {isWithAddParticipate && (
                <AddParticipateStyle>
                  <IsCheckInFunction />
                </AddParticipateStyle>
              )}
              {gridCardValue
                ?.slice(0, limit <= 4 && !isWithAddParticipate ? limit : limit - 1)
                .map((spotsOrPersonsText: AgregatedPersona) => (
                  <EntityPreviewWrapper
                    visibilityOrNetworkQuery={gridCardValue}
                    key={spotsOrPersonsText.uuid}
                    spotOrPersona={spotsOrPersonsText}
                  />
                ))}
            </ComponentWithTable>
            {gridCardValue?.length > 4 && limit < gridCardValue?.length && (
              <SeeMoreStyled>
                <SeeMoreText onClick={handleClick}>{t('SEE_MORE')}</SeeMoreText>
              </SeeMoreStyled>
            )}
          </CardStyled>
        }
      </>
    );
  };

  const IsCheckInFunction = () => {
    if (_.find(gridCardValue, { uuid: user?.defaultPersona })) {
      return (
        <CheckOutText>
          <InputIconStyle svgLink={checkOutSvg} onClick={() => checkInHandler()} />
          Check Out
        </CheckOutText>
      );
    } else return <img src={CheckIn} alt="check in svg" onClick={() => checkInHandler()} />;
  };

  return <CheckEntityList />;
};
