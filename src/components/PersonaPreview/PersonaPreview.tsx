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

const PersonaPreviewWrapper = styled.div`
  height: ${(props) => props.theme.contentHeight};
  overflow: auto;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const SecondPartPersona = styled.div`
  margin: 0 16px 28px 16px;
`;

export const PersonaPreview: FC = () => {
  const { uuid } = useParams();
  const { loading, data } = useQuery<GetCardType>(GET_PERSONA, {
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
  if (isEmpty(data?.persona) || !data) {
    return <div>No personas...</div>;
  }

  console.warn(data.persona.page.content);

  return (
    <>
      <TopNav isWithBackArrow />
      <PersonaPreviewWrapper>
        <Wrapper key={data.persona.uuid}>
          <div>
            <EntityPageComp page={data.persona.page} />
            <RecommendButtonPersona uuid={uuid} />
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
