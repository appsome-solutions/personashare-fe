import React, { FC, useCallback, useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import { GET_CARD, GetCardType } from 'global/graphqls/Persona';

import { TopNav } from 'components/TopNav/TopNav';
import { WideButton } from 'components/Button/WideButton';
import { PageWrapperFromBottom } from 'components/PageWrapper';

export const CreateCard: FC = () => {
  const [getCard, { data }] = useLazyQuery<GetCardType>(GET_CARD);
  const history = useHistory();

  const onNextClick = useCallback((): void => {
    history.push({
      pathname: 'page',
    });
  }, [history]);

  useEffect(() => {
    getCard();
  }, [getCard]);

  if (data) {
    // TODO: integrate with formik
    console.error(data.persona.card);
  }

  return (
    <div>
      <TopNav isWithBackArrow />
      <PageWrapperFromBottom>
        <WideButton onClick={onNextClick}>Next Step</WideButton>
      </PageWrapperFromBottom>
    </div>
  );
};
