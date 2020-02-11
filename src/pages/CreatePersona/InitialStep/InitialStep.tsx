import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { TopNav } from 'components/TopNav/TopNav';
import { PageWrapperFromBottom } from 'components/PageWrapper';
import { InfoCard } from 'components/InfoCard/InfoCard';
import { WideButton } from 'components/Button';

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
      <PageWrapperFromBottom>
        <InfoCard title="Welcome in a Persona Share!">
          The only application on the market where you decide which data you want share. Just create your first
          predefined set of data you want to exchange with 3 simple steps.
        </InfoCard>
        <WideButton onClick={onNextClick}>Next Step</WideButton>
      </PageWrapperFromBottom>
    </div>
  );
};
