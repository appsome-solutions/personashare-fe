import React, { FC } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Overlay } from 'components/Overlay/Overlay';
import { Spinner } from 'components/Spinner/Spinner';
import { VisibilityOrNetwork } from 'components/EntityPreview/VisibilityOrNetwork';
import { GET_SPOT, GetCardType } from 'global/graphqls/Spot';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const NetworkSpot: FC = () => {
  const { uuid } = useParams();
  const { t } = useTranslation();
  const { data, loading } = useQuery<GetCardType>(GET_SPOT, {
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
      gridCardValue={data?.spot?.networkList}
      savedOrRecommend={t('MY_SPOT_UUID_NETWORK_TAB_2')}
      spotsOrPersonsText={t('SPOT_TEXT')}
      visibilityOrNetwork={t('MY_PERSONA_UUID_NETWORK_TAB')}
    />
  );
};
