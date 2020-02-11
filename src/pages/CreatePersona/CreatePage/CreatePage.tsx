import React, { FC, useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { Redirect } from 'react-router-dom';
import { isEqual } from 'lodash';

import { GET_CARD, GET_PAGE, GetCardType, GetPageType } from 'global/graphqls/Persona';
import { cardDefaults } from 'global/ApolloLinkState/persona';

import { TopNav } from 'components/TopNav/TopNav';
import { PageWrapperFromBottom } from 'components/PageWrapper';
import { WideButton } from 'components/Button';

export const CreatePage: FC = () => {
  const [getPage, { data }] = useLazyQuery<GetPageType>(GET_PAGE);
  const [getCard, card] = useLazyQuery<GetCardType>(GET_CARD);

  useEffect(() => {
    getPage();
    getCard();
  }, [getPage, getCard]);

  if (card && card.data && isEqual(cardDefaults, card.data.persona.card)) {
    return <Redirect to="/createpersona/card" />;
  }

  if (data) {
    // TODO: integrate with formik
    console.error(data.persona.page);
  }

  return (
    <div>
      <TopNav isWithBackArrow />
      <PageWrapperFromBottom>
        <WideButton>Create Persona</WideButton>
      </PageWrapperFromBottom>
    </div>
  );
};
