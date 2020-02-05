import React, { FC, useCallback } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';

import { CHANGE_PERSONA_STEP_PATH } from 'global/graphqls/Persona';
import { TopNav } from 'components/TopNav/TopNav';
import { PageWrapper } from 'components/PageWrapper';

import { InfoCard } from '../components/InfoCard';
import { WideButton } from '../components/WideButton';

const StyledCard = styled.div`
  width: 100%;
`;

const PageWrapperBottom = styled(PageWrapper)`
  justify-content: flex-end;
`;

export const InitialStep: FC = () => {
  const [personaStepPath] = useMutation(CHANGE_PERSONA_STEP_PATH);
  const history = useHistory();

  const onNextClick = useCallback((): void => {
    personaStepPath({ variables: { personaStepPath: 'card' } }).then(_r => {
      history.push({
        pathname: 'createpersona/card',
      });
    });
  }, [personaStepPath, history]);

  return (
    <div>
      <TopNav isWithBackArrow />
      <PageWrapperBottom>
        <StyledCard>
          <InfoCard title="Welcome in a Persona Share!">
            The only application on the market where you decide which data you want share. Just create your first
            predefined set of data you want to exchange with 3 simple steps.
          </InfoCard>
          <WideButton onClick={onNextClick}>Next</WideButton>
        </StyledCard>
      </PageWrapperBottom>
    </div>
  );
};
