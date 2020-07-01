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
import { AgregatedSpot } from '../../global/graphqls/schema';
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

  const {
    persona: { recommendList, spotRecommendList },
  } = data as GetCardType;

  const onConfirmFunctions = async () => {
    await recommendSpot();
    await refetch();
  };

  const checkInHandler = () => {
    if (!data) return null;

    if (canBeRecommended) {
      return onConfirmFunctions();
    }

    if (user?.kind === 'premium' && (recommendList.length > 6 || spotRecommendList.length > 6)) {
      return message.info(`You can recommend maximum 6 personas and 6 spots at one time on premium account.`);
    } else if (user?.kind === 'free' && (recommendList.length > 3 || spotRecommendList.length > 3)) {
      return message.info(`You can recommend maximum 3 personas and 3 spots at one time on free account."`);
    } else if (!canBeRecommended) {
      return message.info(
        `This spot has reached maximum recommendation network size. You cannot recommend it at the moment.`
      );
    } else {
      return onConfirmFunctions();
    }
  };

  const IsRecommendedFunction = () => {
    if (_.find(data?.persona.spotRecommendList, { uuid })) {
      return <RecommendEmpty src={recommendOn} alt="Recommend On" />;
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
