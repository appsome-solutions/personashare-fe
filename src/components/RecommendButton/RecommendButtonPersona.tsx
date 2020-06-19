import recommendOff from 'assets/recommendOff.svg';
import React, { FC } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_PERSONA, GetCardType, RECOMMEND_PERSONA, RecommendPersonaResponse } from 'global/graphqls/Persona';
import recommendOn from 'assets/recommendOn.svg';
import { Popconfirm } from 'antd';
import { gqlUser } from 'global/graphqls/schema';
import { GET_USER } from 'global/graphqls/User';
import _ from 'lodash';
import { useUserContext } from '../../global/UserContext/UserContext';

type RecommendPersona = {
  uuid: string;
};

const RecommendEmpty = styled.img`
  position: relative;
  top: -21px;
  left: calc(100% - 61px);
`;

export const RecommendButtonPersona: FC<RecommendPersona> = ({ uuid }) => {
  const { user } = useUserContext();
  const [recommendPersona] = useMutation<RecommendPersonaResponse>(RECOMMEND_PERSONA, {
    variables: { recommendedPersonaUuid: uuid },
  });
  const { data, refetch } = useQuery<GetCardType>(GET_PERSONA, {
    variables: { uuid: user?.defaultPersona },
    skip: !user,
  });

  if (!uuid || !data) {
    return null;
  }

  const onConfirmFunctions = async () => {
    await recommendPersona();
    await refetch();
  };

  const IsRecommendedFunction = () => {
    if (_.find(data?.persona.recommendList, { uuid })) {
      return <RecommendEmpty src={recommendOn} alt="Recommend On" />;
    } else
      return (
        <Popconfirm
          title="Are you sure you want to recommend this persona? It will be shared with your persona at least for the next month."
          onConfirm={() => onConfirmFunctions()}
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
