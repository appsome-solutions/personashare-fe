import React, { FC } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import isEmpty from 'lodash/isEmpty';
import { GetCardType } from 'global/graphqls/Persona';
import { Spinner } from 'components/Spinner/Spinner';
import { Overlay } from 'components/Overlay/Overlay';
import { EntityPageComp } from 'components/EntityPageComp/EntityPageComp';
import { GET_PERSONA } from 'global/graphqls/Persona';
import { useParams } from 'react-router-dom';
import { RecommendButtonPersona } from 'components/RecommendButton/RecommendButtonPersona';
import { SavePersona } from 'components/SaveEntity/SavePersona';
import { RecommendContactBook } from 'components/ContactBook/RecommendListContact';
import { TopNav } from 'components/TopNav/TopNav';
import QuillEditor from 'components/QuillEditor/QuillEditor';
import _ from 'lodash';
import { notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { StickyNavigation } from '../../global/Layouts/StickyNavigation/StickyNavigation';

const PersonaPreviewWrapper = styled.div`
  min-height: ${(props) => props.theme.contentHeight};
  overflow: auto;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SecondPartPersona = styled.div`
  margin: 0 16px 28px 16px;
`;

const StyledRecommendButtonPersona = styled(RecommendButtonPersona)`
  top: 186px;
  right: 12px;
  position: absolute;
`;

export const PersonaPreview: FC = () => {
  const { uuid } = useParams();
  const { t } = useTranslation();
  const { loading, data } = useQuery<GetCardType>(GET_PERSONA, {
    variables: { uuid },
  });

  const addPersonaToRecentlyViewed = () => {
    let recentlyViewedPersonas = JSON.parse(localStorage.getItem('recentlyViewedPersonas') || '[]');

    if (recentlyViewedPersonas.length === 0) {
      notification.info({
        message: `${t('RECENTLY_VIEWED_FEATURE')}`,
        duration: 0,
        description: `${t('RECENTLY_VIEWED_NOTIFICATIONS')}`,
      });
    }

    recentlyViewedPersonas.push(uuid);

    recentlyViewedPersonas = _.compact(_.uniq(recentlyViewedPersonas));

    if (recentlyViewedPersonas.length > 5) {
      recentlyViewedPersonas.shift();
    }

    localStorage.setItem('recentlyViewedPersonas', JSON.stringify(recentlyViewedPersonas));
  };

  if (loading) {
    return (
      <Overlay>
        <Spinner />
      </Overlay>
    );
  }
  // OR !data is used cause typescript doesn't know that data can no longer be undefined in return method
  if (isEmpty(data?.persona) || !data) {
    return <div>{t('NO_PERSONA')}</div>;
  }

  addPersonaToRecentlyViewed();

  return (
    <>
      <TopNav isWithBackArrow />
      <PersonaPreviewWrapper>
        <Wrapper key={data.persona.uuid}>
          <div>
            <EntityPageComp page={data.persona.page} />
            <StyledRecommendButtonPersona uuid={uuid} />
          </div>
        </Wrapper>
        <SecondPartPersona>
          <QuillEditor
            editable={false}
            initialValue={data.persona.page.content}
            uploadAssetsProps={{
              assetsList: data.persona.page.fileList,
              asPreview: true,
            }}
            managerListProps={{
              uuid,
            }}
          />
          <RecommendContactBook entity={data.persona} />
          <SavePersona uuid={uuid} />
        </SecondPartPersona>
      </PersonaPreviewWrapper>
      <StickyNavigation />
    </>
  );
};
