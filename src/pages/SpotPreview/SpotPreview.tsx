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
import { TopNav } from 'components/TopNav/TopNav';
import { ManagerList } from 'components/SpotBook/ManagerList/ManagerList';
import { vh } from 'helpers/styled';
import { ParticipantList } from '../ParticipantList/ParticipantList';
import QuillEditor from '../../components/QuillEditor/QuillEditor';
import useLocalStorage from 'react-use-localstorage';
import _ from 'lodash';
import { receiveMessageOnPort } from 'worker_threads';

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
  height: ${vh(100)};
`;

const SecondPartSpot = styled.div`
  margin: 0 16px 28px 16px;
`;

export const SpotPreview: FC<SpotPreviewType> = ({ isEditMode }) => {
  const { uuid } = useParams();
  const { loading, data } = useQuery<GetCardType>(GET_SPOT, {
    variables: { uuid },
  });

  const [setRecentlyViewedSpots] = useLocalStorage('recentlyViewedSpots', JSON.stringify([]));

  const addSpotToRecentlyViewed = () => {
    let recentlyViewedSpots = JSON.parse(localStorage.getItem('recentlyViewedSpots') || '[]');

    recentlyViewedSpots.push(uuid);

    recentlyViewedSpots = _.uniq(recentlyViewedSpots);

    if (recentlyViewedSpots.length > 5) {
      recentlyViewedSpots.shift();
    }

    localStorage.setItem('recentlyViewedSpots', JSON.stringify(recentlyViewedSpots));
  };

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

  addSpotToRecentlyViewed();

  return (
    <>
      <TopNav isWithBackArrow />
      <MainComponent>
        <Wrapper key={data.spot.uuid}>
          <EntityPageComp page={data.spot.page} />
          <RecommendButtonSpot uuid={uuid} entityUuid={data.spot.networkList} />
          <QuillEditor
            editable={false}
            initialValue={data.spot.page.content}
            uploadAssetsProps={{
              assetsList: data.spot.page.fileList,
              asPreview: true,
            }}
            managerListProps={{
              uuid: data.spot.uuid,
            }}
          />
        </Wrapper>
        {isEditMode && <ManagerList />}
        <SecondPartSpot>
          <SaveSpotButton uuid={uuid} />
        </SecondPartSpot>
      </MainComponent>
    </>
  );
};
