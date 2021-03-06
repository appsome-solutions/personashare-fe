import React, { FC } from 'react';
import { useQuery } from '@apollo/react-hooks';
import isEmpty from 'lodash/isEmpty';
import { Spinner } from 'components/Spinner/Spinner';
import { Overlay } from 'components/Overlay/Overlay';
import { useParams } from 'react-router-dom';
import { EntityPreview } from 'components/EntityPreview/EntityPreview';
import { GET_PERSONA, GetCardType } from 'global/graphqls/Persona';
import { RecommendContactBook } from 'components/ContactBook/RecommendListContact';
import styled from 'styled-components';
import { PageWrapper } from '../../components/PageWrapper';
import { useTranslation } from 'react-i18next';

const StyledRecommendContactBook = styled(RecommendContactBook)`
  padding: 0 16px;
`;

const StyledPageWrapper = styled(PageWrapper)`
  padding: 0px;
  height: auto;
  min-height: ${(props) => props.theme.contentHeightWithTabs};
`;

export const MyPersonasPreview: FC = () => {
  const { uuid } = useParams();
  const { t } = useTranslation();
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
    return <div>{t('NO_PERSONA')}</div>;
  }

  return (
    <StyledPageWrapper justifyContent="end">
      <EntityPreview uuidQuery={data.persona.uuid} entityPage={data.persona.page} />
      <StyledRecommendContactBook entity={data.persona} />
    </StyledPageWrapper>
  );
};
