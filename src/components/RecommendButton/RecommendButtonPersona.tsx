import recommendOff from 'assets/recommendOff.svg';
import React, { FC } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_PERSONA, GetCardType, RECOMMEND_PERSONA, RecommendPersonaResponse } from 'global/graphqls/Persona';
import recommendOn from 'assets/recommendOn.svg';
import { Popconfirm } from 'antd';
import _ from 'lodash';
import { useUserContext } from 'global/UserContext/UserContext';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';

type RecommendPersona = {
  uuid: string;
  entityUuid?: any;
};

const RecommendEmpty = styled.img`
  position: relative;
  top: -60px;
  left: calc(100% - 61px);
`;

export const RecommendButtonPersona: FC<RecommendPersona> = ({ uuid, entityUuid }) => {
  const { user } = useUserContext();
  const [recommendPersona] = useMutation<RecommendPersonaResponse>(RECOMMEND_PERSONA, {
    variables: { recommendedPersonaUuid: uuid },
  });
  const { data, refetch } = useQuery<GetCardType>(GET_PERSONA, {
    variables: { uuid: user?.defaultPersona },
  });
  const { t } = useTranslation();

  const onConfirmFunctions = async () => {
    await recommendPersona();
    await refetch();
  };

  const messageErrorHandler = () => {
    if (!data) return null;

    if (user?.kind === 'free' && entityUuid.length > 2) {
      return message.info(`${t('PERSONA_UUID_RECOMMEND_FREE')}}`);
    } else {
      return message.info(`${t('PERSONA_UUID_RECOMMEND_PREMIUM')}`);
    }
  };

  const checkInHandler = () => {
    if (!data) return null;

    if (user?.kind === 'free' && entityUuid.length > 2) {
      return messageErrorHandler();
    } else if (user?.kind === 'premium' && entityUuid.length > 5) {
      return messageErrorHandler();
    } else {
      return onConfirmFunctions();
    }
  };

  const IsRecommendedFunction = () => {
    if (_.find(data?.persona.recommendList, { uuid })) {
      return <RecommendEmpty src={recommendOn} alt="Recommend On" />;
    } else
      return (
        <Popconfirm
          title={t('PERSONA_UUID_RECOMMEND_INFO')}
          onConfirm={() => checkInHandler()}
          okText={t('PERSONA_UUID_RECOMMEND_BUTTONS_YES')}
          cancelText={t('PERSONA_UUID_RECOMMEND_BUTTONS_NO')}
          placement="bottomRight"
        >
          <RecommendEmpty src={recommendOff} alt="Recommend Off" />
        </Popconfirm>
      );
  };

  return <IsRecommendedFunction />;
};
