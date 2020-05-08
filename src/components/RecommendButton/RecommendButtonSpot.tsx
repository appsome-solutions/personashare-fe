import recommendOff from 'assets/recommendOff.svg';
import React, { FC } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery } from '@apollo/react-hooks';
import recommendOn from 'assets/recommendOn.svg';
import { useParams } from 'react-router-dom';
import { Popconfirm } from 'antd';
import { GET_SPOT, GetCardType, RECOMMEND_SPOT, RecommendSpotResponse } from '../../global/graphqls/Spot';

const RecommendEmpty = styled.img`
  position: relative;
  bottom: 20px;
  left: 135px;
`;

export const RecommendButtonSpot: FC = () => {
  const { uuid } = useParams();
  const [recommendSpot] = useMutation<RecommendSpotResponse>(RECOMMEND_SPOT, {
    variables: { recommendedSpotUuid: uuid, personaUuid: uuid },
  });
  const { data } = useQuery<GetCardType>(GET_SPOT, {
    variables: { uuid },
  });

  const CheckFunction = () => {
    if (!data?.spot.recommendList) {
      return (
        <Popconfirm
          title="Are you sure you want to recommend this persona? It will be shared with your persona at least for the next month."
          onConfirm={() => recommendSpot()}
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
