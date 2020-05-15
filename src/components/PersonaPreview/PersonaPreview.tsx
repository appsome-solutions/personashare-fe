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
import { SavePersona } from '../SaveEntity/SavePersona';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
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

  return (
    <>
      <Wrapper key={data.persona.uuid}>
        <EntityPageComp page={data.persona.page} />
        <RecommendButtonPersona />
      </Wrapper>
      <SecondPartPersona>
        <SavePersona />
      </SecondPartPersona>
    </>
  );
};
