import React, { FC } from 'react';
import { VisibilityOrNetwork } from '../../components/EntityPreview/VisibilityOrNetwork';
import { APP_ROUTES } from 'global/AppRouter/routes';
import { useQuery } from '@apollo/react-hooks';
import { gqlUser } from 'global/graphqls/schema';
import { GET_USER } from 'global/graphqls/User';
import { GET_PERSONA, GetCardType } from 'global/graphqls/Persona';
import { Overlay } from 'components/Overlay/Overlay';
import { Spinner } from 'components/Spinner/Spinner';
import { useParams } from 'react-router-dom';

export const NetworkPersona: FC = () => {
  const { uuid } = useParams();
  const { data, loading } = useQuery<GetCardType>(GET_PERSONA, {
    variables: { uuid: uuid },
  });

  if (!data) return null;

  if (loading) {
    return (
      <Overlay>
        <Spinner />
      </Overlay>
    );
  }

  return (
    <VisibilityOrNetwork
      gridCardValue={data?.persona.networkList}
      savedOrRecommend="recommend"
      spotsOrPersonsText="persona"
      visibilityOrNetwork="network"
    />
  );
};
