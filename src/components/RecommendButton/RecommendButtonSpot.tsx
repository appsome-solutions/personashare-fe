import recommendOff from 'assets/recommendOff.svg';
import React, { FC } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery } from '@apollo/react-hooks';
import recommendOn from 'assets/recommendOn.svg';
import { useParams } from 'react-router-dom';
import { Popconfirm } from 'antd';
import _ from 'lodash';
import { RECOMMEND_SPOT, RecommendSpotResponse } from 'global/graphqls/Spot';
import { GET_PERSONA, GetCardType } from 'global/graphqls/Persona';
import { useUserContext } from 'global/UserContext/UserContext';

const RecommendEmpty = styled.img`
  align-self: flex-end;
  position: relative;
  right: 20px;
  top: -60px;
`;

type RecommendButtonSpotType = {
  uuid: string;
  className?: string;
  entityUuid?: any;
};

export const RecommendButtonSpot: FC<RecommendButtonSpotType> = ({ uuid, className }) => {
  const { user } = useUserContext();

  const [recommendSpot] = useMutation<RecommendSpotResponse>(RECOMMEND_SPOT, {
    variables: { recommendedSpotUuid: uuid },
  });
  const { data, refetch } = useQuery<GetCardType>(GET_PERSONA, {
    variables: { uuid: user?.defaultPersona },
    skip: !user,
  });

  const onConfirmFunctions = async () => {
    await recommendSpot();
    await refetch();
  };

  const messageErrorHandler = () => {
    if (!data) return null;

    if (user?.kind === 'free' && entityUuid.length > 2) {
      return message.info(
        `This spot has reached maximum recommendation network size. You cannot recommend it at the moment."`
      );
    } else {
      return message.info(
        `This spot has reached maximum recommendation network size. You cannot recommend it at the moment.`
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
    if (_.find(data?.persona.spotRecommendList, { uuid })) {
      return <RecommendEmpty src={recommendOn} alt="Recommend On" />;
    } else
      return (
        <Popconfirm
          title="Are you sure you want to recommend this spot? It will be shared with your persona at least for the next month."
          onConfirm={() => checkInHandler()}
          okText="Yes"
          cancelText="No"
          className={className}
        >
          <RecommendEmpty src={recommendOff} alt="Recommend Off" />
        </Popconfirm>
      );
  };

  return <IsRecommendedFunction />;
};
