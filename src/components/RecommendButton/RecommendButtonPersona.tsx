import recommendOff from 'assets/recommendOff.svg';
import React, { FC } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_PERSONA, GetCardType, RECOMMEND_PERSONA, RecommendPersonaResponse } from '../../global/graphqls/Persona';
import recommendOn from 'assets/recommendOn.svg';
import { useParams } from 'react-router-dom';
import { Popconfirm } from 'antd';

const RecommendEmpty = styled.img`
  position: relative;
  bottom: 20px;
  left: 135px;
`;

export const RecommendButtonPersona: FC = () => {
  const { uuid } = useParams();
  const [recommendPersona] = useMutation<RecommendPersonaResponse>(RECOMMEND_PERSONA, {
    variables: { recommendedPersonaUuid: uuid, personaUuid: uuid },
  });
  const { data } = useQuery<GetCardType>(GET_PERSONA, {
    variables: { uuid },
  });

  if (!data) return null;
  const CheckFunction = () => {
    if (!data.persona.recommendList) {
      return (
        <Popconfirm
          title="Are you sure you want to recommend this persona? It will be shared with your persona at least for the next month."
          onConfirm={() => recommendPersona()}
          okText="Yes"
          cancelText="No"
        >
          <RecommendEmpty src={recommendOff} alt="Recommend Off" />
        </Popconfirm>
      );
    } else return <RecommendEmpty src={recommendOn} alt="Recommend On" />;
  };
  return <CheckFunction />;
};
