import React, { FC } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery } from '@apollo/react-hooks';
import isEmpty from 'lodash/isEmpty';
import { GetCardType, SAVE_PERSONA, SavePersonaResponse } from 'global/graphqls/Persona';
import { Spinner } from 'components/Spinner/Spinner';
import { Overlay } from 'components/Overlay/Overlay';
import { EntityPageComp } from 'components/EntityPageComp/EntityPageComp';
import { GET_PERSONA } from 'global/graphqls/Persona';
import { useParams } from 'react-router-dom';
import { WideButton } from '../Button';
import { RecommendButtons } from 'components/RecommendButton/RecommendButtonPersona';
const MainComponent = styled.div``;

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
  const [savePersona] = useMutation<SavePersonaResponse>(SAVE_PERSONA, {
    variables: {
      savedPersonaUuid: uuid,
      personaUuid: uuid,
    },
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
    <MainComponent>
      <Wrapper key={data.persona.uuid}>
        <EntityPageComp page={data.persona.page} />
        <RecommendButtons />
      </Wrapper>
      <SecondPartPersona>
        <WideButton onClick={() => savePersona()}>SAVE</WideButton>
      </SecondPartPersona>
    </MainComponent>
  );
};
