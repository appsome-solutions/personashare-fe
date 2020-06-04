import React, { FC } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import isEmpty from 'lodash/isEmpty';
import { Spinner } from 'components/Spinner/Spinner';
import { Overlay } from 'components/Overlay/Overlay';
import { EntityPageComp } from 'components/EntityPageComp/EntityPageComp';
import { useParams } from 'react-router-dom';
import { GET_SPOT, GetCardType } from 'global/graphqls/Spot';
import { RecommendButtonSpot } from 'components/RecommendButton/RecommendButtonSpot';
import { SaveSpotButton } from 'components/SaveEntity/SaveSpot';
import { ManagerList } from '../SpotBook/ManagerList/ManagerList';
import { TopNav } from '../TopNav/TopNav';
import { ManagerList } from 'components/SpotBook/ManagerList/ManagerList';
import { ManagerListEditMode } from 'components/SpotBook/ManagerList/EditModeManager';
import { APP_ROUTES } from 'global/AppRouter/routes';

type SpotPreviewType = {
  isEditMode?: boolean;
};

const MainComponent = styled.div`
  display: flex;
  flex-direction: column;
  max-height: ${(props) => props.theme.contentHeight};

  height: 100%;
  overflow: auto;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const SecondPartSpot = styled.div`
  margin: 0 16px 28px 16px;
`;

const baseUrl = process.env.REACT_APP_BASE_URL || 'https://persona-share.netlify.app';

export const SpotPreview: FC<SpotPreviewType> = ({ isEditMode }) => {
  const { uuid } = useParams();
  const { loading, data } = useQuery<GetCardType>(GET_SPOT, {
    variables: { uuid },
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
    <>
      <TopNav isWithBackArrow />
      <MainComponent>
        <Wrapper key={data.spot.uuid}>
          <EntityPageComp page={data.spot.page} />
          <RecommendButtonSpot />
        </Wrapper>
        {isEditMode ? (
          <ManagerList />
        ) : (
          <ManagerListEditMode
            invitationLink={`${baseUrl}${APP_ROUTES.SPOT_INVITATION(data?.spot.uuid)}`}
            spot={data?.spot}
          />
        )}
        <SecondPartSpot>
          <SaveSpotButton />
        </SecondPartSpot>
      </MainComponent>
    </>
  );
};
