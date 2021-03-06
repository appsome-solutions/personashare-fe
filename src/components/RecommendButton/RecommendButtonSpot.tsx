import recommendOff from 'assets/recommendOff.svg';
import React, { FC } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery } from '@apollo/react-hooks';
import recommendOn from 'assets/recommendOn.svg';
import { message, Popconfirm } from 'antd';
import _ from 'lodash';
import { RECOMMEND_SPOT, RecommendSpotResponse } from 'global/graphqls/Spot';
import { GET_PERSONA, GetCardType } from 'global/graphqls/Persona';
import { useUserContext } from 'global/UserContext/UserContext';
import { useTranslation } from 'react-i18next';

const RecommendEmpty = styled.img`
  align-self: flex-end;
  position: relative;
  right: 20px;
  top: -60px;
`;

type RecommendButtonSpotType = {
  uuid: string;
  className?: string;
  canBeRecommended: boolean;
};

export const RecommendButtonSpot: FC<RecommendButtonSpotType> = ({ uuid, className, canBeRecommended }) => {
  const { user } = useUserContext();

  const [recommendSpot] = useMutation<RecommendSpotResponse>(RECOMMEND_SPOT, {
    variables: { recommendedSpotUuid: uuid },
  });
  const { data, refetch } = useQuery<GetCardType>(GET_PERSONA, {
    variables: { uuid: user?.defaultPersona },
    skip: !user,
  });
  const { t } = useTranslation();

  const onConfirmFunctions = async () => {
    await recommendSpot();
    await refetch();
  };

  const checkInHandler = () => {
    if (!data) return null;

    const {
      persona: { recommendList, spotRecommendList },
    } = data;

    if (user?.kind === 'premium' && (recommendList.length > 5 || spotRecommendList.length > 5)) {
      return message.info(`${t('PERSONA_UUID_RECOMMEND_PREMIUM')}}`);
    } else if (user?.kind === 'free' && (recommendList.length > 2 || spotRecommendList.length > 2)) {
      return message.info(`${t('PERSONA_UUID_RECOMMEND_FREE')}}`);
    } else if (!canBeRecommended) {
      return message.info(`${t('SPOT_UUID_RECOMMEND_FREE')}`);
    } else {
      return onConfirmFunctions();
    }
  };

  const IsRecommendedFunction = () => {
    if (_.find(data?.persona.spotRecommendList, { uuid })) {
      return <RecommendEmpty src={recommendOn} alt="Recommend On" className={className} />;
    } else
      return (
        <Popconfirm
          title={t('SPOT_UUID_RECOMMEND_INFO')}
          onConfirm={() => checkInHandler()}
          okText={t('SPOT_UUID_RECOMMEND_BUTTONS_YES')}
          cancelText={t('SPOT_UUID_RECOMMEND_BUTTONS_NO')}
          className={className}
        >
          <RecommendEmpty src={recommendOff} alt="Recommend Off" />
        </Popconfirm>
      );
  };

  return <IsRecommendedFunction />;
};
