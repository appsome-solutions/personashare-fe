import React, { FC } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery } from '@apollo/react-hooks';
import isEmpty from 'lodash/isEmpty';
import { Spinner } from 'components/Spinner/Spinner';
import { Overlay } from 'components/Overlay/Overlay';
import { EntityPageComp } from 'components/EntityPageComp/EntityPageComp';
import { useParams } from 'react-router-dom';
import { GET_SPOT_PAGE, GetCardType, SAVE_SPOT, SaveSpotResponse } from 'global/graphqls/Spot';
import { WideButton } from '../Button';
import { RecommendButtonSpot } from '../RecommendButton/RecommendButtonSpot';

const MainComponent = styled.div`
  height: 100 vh;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SecondPartPersona = styled.div`
  margin: 0 16px 28px 16px;
`;

export const SpotPreview: FC = () => {
  const { uuid } = useParams();
  const { loading, data } = useQuery<GetCardType>(GET_SPOT_PAGE, {
    variables: { uuid },
  });
  const [saveSpot] = useMutation<SaveSpotResponse>(SAVE_SPOT, {
    variables: { savedSpotUuid: uuid, spotUuid: uuid },
  });

  if (loading) {
    return (
      <Overlay>
        <Spinner />
      </Overlay>
    );
  }
  // OR !data is used cause typescript doesn't know that data can no longer be undefined in return method
  if (isEmpty(data?.spot) || !data) {
    return <div>No spots...</div>;
  }

  return (
    <MainComponent>
      <Wrapper key={data.spot.uuid}>
        <EntityPageComp page={data.spot.page} />
        <RecommendButtonSpot />
      </Wrapper>
      <SecondPartPersona>
        <WideButton onClick={() => saveSpot()}>SAVE</WideButton>
      </SecondPartPersona>
    </MainComponent>
  );
};
