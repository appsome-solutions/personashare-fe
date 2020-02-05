import React, { FC, useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { GET_PAGE, GET_PERSONA_STEP_PATH, GetCurrentStepType, GetPageType } from 'global/graphqls/Persona';
import { TopNav } from '../../../components/TopNav/TopNav';

export const CreatePage: FC = () => {
  const [getInitializedState, { data }] = useLazyQuery<GetCurrentStepType>(GET_PERSONA_STEP_PATH);
  const [getPage, pageData] = useLazyQuery<GetPageType>(GET_PAGE);
  const history = useHistory();

  useEffect(() => {
    getInitializedState();
    getPage();
  }, [getInitializedState, getPage]);

  useEffect(() => {
    if (data) {
      if (data.persona.personaStepPath === '') {
        history.push({
          pathname: 'createpersona',
        });
      }

      if (data.persona.personaStepPath === 'card') {
        history.push({
          pathname: 'createpersona/card',
        });
      }
    }
  }, [data, history]);

  console.error(pageData.data);

  return (
    <div>
      <TopNav isWithBackArrow />
    </div>
  );
};
