import React, { FC } from 'react';
import { VisibilityOrNetwork } from 'components/EntityPreview/VisibilityOrNetwork';
import { useQuery } from '@apollo/react-hooks';
import { GET_PERSONA, GetCardType } from 'global/graphqls/Persona';
import { Overlay } from 'components/Overlay/Overlay';
import { Spinner } from 'components/Spinner/Spinner';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const NetworkPersona: FC = () => {
  const { uuid } = useParams();
  const { t } = useTranslation();
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
      savedOrRecommend={t('MY_PERSONA_UUID_NETWORK_TAB_2')}
      spotsOrPersonsText={t('PERSONA_TEXT')}
      visibilityOrNetwork={t('MY_PERSONA_UUID_NETWORK_TAB')}
    />
  );
};
