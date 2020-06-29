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
import QuillEditor from '../../components/QuillEditor/QuillEditor';
import _ from 'lodash';
import { notification } from 'antd';

type SpotPreviewType = {
  isEditMode?: boolean;
};

const MainComponent = styled.div`
  display: flex;
  flex-direction: column;
  max-height: ${(props) => props.theme.contentHeightWithTabs};
  height: auto;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SecondPartSpot = styled.div`
  margin: 0 16px 28px 16px;
`;

export const SpotPreview: FC<SpotPreviewType> = ({ isEditMode }) => {
  const { uuid } = useParams();
  const { loading, data } = useQuery<GetCardType>(GET_SPOT, {
    variables: { uuid },
  });

  const addSpotToRecentlyViewed = () => {
    let recentlyViewedSpots = JSON.parse(localStorage.getItem('recentlyViewedSpots') || '[]');

    if (recentlyViewedSpots.length === 0) {
      notification.info({
        message: 'Recently viewed feature',
        duration: 0,
        description:
          'If you don’t have a time to register now, don’t worry. We will store spots you scan on your device for a while. You can find them in spot book. If you want to save them pernamentely, after registration simply save them using “Save” button.',
      });
    }

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
