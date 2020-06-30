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

export const PersonaPreview: FC = () => {
  const { uuid } = useParams();
  const { loading, data } = useQuery<GetCardType>(GET_PERSONA, {
    variables: { uuid },
  });

  const addPersonaToRecentlyViewed = () => {
    let recentlyViewedPersonas = JSON.parse(localStorage.getItem('recentlyViewedPersonas') || '[]');

    if (recentlyViewedPersonas.length === 0) {
      notification.info({
        message: 'Recently viewed feature',
        duration: 0,
        description:
          'If you don’t have a time to register now, don’t worry. We will store personas you scan on your device for a while. You can find them in contact book. If you want to save them pernamentely, after registration simply save them using “Save” button.',
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
    return <div>No personas...</div>;
  }

  addPersonaToRecentlyViewed();

  return (
    <>
      <TopNav isWithBackArrow />
      <PersonaPreviewWrapper>
        <Wrapper key={data.persona.uuid}>
          <div>
            <EntityPageComp page={data.persona.page} />
            <RecommendButtonPersona uuid={uuid} entityUuid={data.persona.networkList} />
          </div>
        </Wrapper>
        <SecondPartPersona>
          <QuillEditor editable={false} initialValue={data.persona.page.content} />
          <RecommendContactBook entity={data.persona} />
          <SavePersona uuid={uuid} />
        </SecondPartPersona>
      </PersonaPreviewWrapper>
    </>
  );
};
