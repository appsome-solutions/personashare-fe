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

  const onConfirmFunctions = async () => {
    await recommendPersona();
    await refetch();
  };

  const messageErrorHandler = () => {
    if (!data) return null;

    if (user?.kind === 'free' && entityUuid.length > 2) {
      return message.info(
        `This persona has reached maximum recommendation network size. You cannot recommend it at the moment."`
      );
    } else {
      return message.info(
        `This persona has reached maximum recommendation network size. You cannot recommend it at the moment.`
      );
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
          title="Are you sure you want to recommend this persona? It will be shared with your persona at least for the next month."
          onConfirm={() => checkInHandler()}
          okText="Yes"
          cancelText="No"
          placement="bottomRight"
        >
          <RecommendEmpty src={recommendOff} alt="Recommend Off" />
        </Popconfirm>
      );
  };

  return <IsRecommendedFunction />;
};
