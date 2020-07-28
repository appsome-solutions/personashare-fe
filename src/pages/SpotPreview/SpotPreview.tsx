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
import { useTranslation } from 'react-i18next';
import { StickyNavigation } from '../../global/Layouts/StickyNavigation/StickyNavigation';

type SpotPreviewType = {
  isEditMode?: boolean;
};

const MainComponent = styled.div`
  display: flex;
  flex-direction: column;
  // min-height: ${(props) => props.theme.contentHeightWithTabs}; is not working for /spot/:uuid
  min-height: ${(props) => props.theme.contentHeight};
  height: auto;
  overflow: auto;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledRecommendButtonSpot = styled(RecommendButtonSpot)`
  top: -64px;
  right: 12px;
`;

const SecondPartSpot = styled.div`
  margin: 0 16px 28px 16px;
`;

export const SpotPreview: FC<SpotPreviewType> = ({ isEditMode }) => {
  const { uuid } = useParams();
  const { t } = useTranslation();
  const { loading, data } = useQuery<GetCardType>(GET_SPOT, {
    variables: { uuid },
  });

  const addSpotToRecentlyViewed = () => {
    let recentlyViewedSpots = JSON.parse(localStorage.getItem('recentlyViewedSpots') || '[]');

    if (recentlyViewedSpots.length === 0) {
      notification.info({
        message: `${t('RECENTLY_VIEWED_FEATURE')}`,
        duration: 0,
        description: `${t('RECENTLY_VIEWED_NOTIFICATIONS_SPOT')}`,
      });
    }

    recentlyViewedSpots.push(uuid);

    recentlyViewedSpots = _.compact(_.uniq(recentlyViewedSpots));

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
    return <div>{t('NO_SPOTS')}</div>;
  }

  addSpotToRecentlyViewed();

  return (
    <>
      <TopNav isWithBackArrow />
      <MainComponent>
        <CardWrapper key={data.spot.uuid}>
          <EntityPageComp page={data.spot.page} />
          <StyledRecommendButtonSpot uuid={uuid} canBeRecommended={data.spot.canBeRecommended} />
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
        </CardWrapper>
        {isEditMode && <ManagerList />}
        <SecondPartSpot>
          <SaveSpotButton uuid={uuid} />
        </SecondPartSpot>
      </MainComponent>
      <StickyNavigation />
    </>
  );
};
