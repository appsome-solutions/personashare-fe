import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { PageWrapperSpaceBetween } from 'components/PageWrapper';
import { InfoCard } from 'components/InfoCard/InfoCard';
import { WideButton } from 'components/Button';
import { Stepper } from 'components/Stepper';
import { TopNav } from 'components/TopNav/TopNav';

export const InitialStep: FC = () => {
  const history = useHistory();

  const onNextClick = useCallback((): void => {
    history.push({
      pathname: 'createpersona/card',
    });
  }, [history]);

  return (
    <div>
      <TopNav isWithBackArrow />
      <PageWrapperSpaceBetween>
        <div>
          <Stepper items={[1, 2, 3]} current={1} mb={31} />
          <InfoCard title="Welcome in a Persona Share!">
            The only application on the market where you decide which data you want share. Just create your first
            predefined set of data you want to exchange with 3 simple steps.
          </InfoCard>
        </div>
        <WideButton onClick={onNextClick}>Next Step</WideButton>
      </PageWrapperSpaceBetween>
    </div>
  );
};
