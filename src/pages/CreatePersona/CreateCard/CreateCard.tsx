import React, { FC, useCallback, useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import {
  CHANGE_PERSONA_STEP_PATH,
  GET_CARD,
  GET_PERSONA_STEP_PATH,
  GetCardType,
  GetCurrentStepType,
} from 'global/graphqls/Persona';

import { TopNav } from 'components/TopNav/TopNav';
import { WideButton } from 'components/Button/WideButton';
import { PageWrapperFromBottom } from '../../../components/PageWrapper';

export const CreateCard: FC = () => {
  const [getInitializedState, { data }] = useLazyQuery<GetCurrentStepType>(GET_PERSONA_STEP_PATH);
  const [getCard, cardData] = useLazyQuery<GetCardType>(GET_CARD);
  const [personaStepPath] = useMutation(CHANGE_PERSONA_STEP_PATH);
  const history = useHistory();

  const onNextClick = useCallback((): void => {
    personaStepPath({ variables: { personaStepPath: 'page' } }).then(_r => {
      history.push({
        pathname: 'page',
      });
    });
  }, [personaStepPath, history]);

  useEffect(() => {
    getInitializedState();
    getCard();
  }, [getInitializedState, getCard]);

  useEffect(() => {
    console.error(cardData.data);
    if (data && data.persona.personaStepPath === '') {
      history.push({
        pathname: 'createpersona',
      });
    }
  }, [data, history]);

  return (
    <div>
      <TopNav isWithBackArrow />
      <PageWrapperFromBottom>
        <WideButton onClick={onNextClick}>Next Step</WideButton>
      </PageWrapperFromBottom>
    </div>
  );
};
