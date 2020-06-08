import React, { FC } from 'react';
import { useQuery } from '@apollo/react-hooks';
import isEmpty from 'lodash/isEmpty';
import { Spinner } from 'components/Spinner/Spinner';
import { Overlay } from 'components/Overlay/Overlay';
import { useParams } from 'react-router-dom';
import { EntityPreview } from '../../components/EntityPreview/EntityPreview';
import { GET_PERSONA, GetCardType } from '../../global/graphqls/Persona';
import { TopNav } from '../../components/TopNav/TopNav';
import { StatsNavigationPersona } from '../../components/Statistics/StatsNavigationPersona';

export const MyPersonaPreview: FC = () => {
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
      <TopNav isWithBackArrow />
      <StatsNavigationPersona />
      <EntityPreview uuidQuery={data.persona.uuid} entityPage={data.persona.page} />;
    </>
  );
};
