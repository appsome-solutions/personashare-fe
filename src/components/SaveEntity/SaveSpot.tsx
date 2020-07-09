import { WideButton } from 'components/Button';
import React, { FC } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import _ from 'lodash';
import { SAVE_SPOT, SaveSpotResponse } from 'global/graphqls/Spot';
import { GET_PERSONA, GetCardType } from 'global/graphqls/Persona';
import styled from 'styled-components';
import { useUserContext } from 'global/UserContext/UserContext';
import { useTranslation } from 'react-i18next';

const ButtonSavedStyled = styled(WideButton)`
  && {
    background-color: ${(props) => props.theme.colors.functional.disabled};
    &&:active,
    &&:hover {
      color: ${(props) => props.theme.colors.functional.disabled};
    }
  }
`;

type SaveSpotButtonProps = {
  uuid: string;
};

export const SaveSpotButton: FC<SaveSpotButtonProps> = ({ uuid }) => {
  const { user } = useUserContext();
  const { data, refetch } = useQuery<GetCardType>(GET_PERSONA, {
    variables: { uuid: user?.defaultPersona },
    skip: !user,
  });
  const [saveSpot] = useMutation<SaveSpotResponse>(SAVE_SPOT, {
    variables: {
      savedSpotUuid: uuid,
    },
  });
  const { t } = useTranslation();

  const onClickFunctions = async () => {
    await saveSpot();
    await refetch();
  };

  const IsSaveFunction = () => {
    if (!_.find(data?.persona.spotBook, { uuid })) {
      return <WideButton onClick={() => onClickFunctions()}>{t('SPOT_UUID_ENTITY_BUTTON')}</WideButton>;
    } else return <ButtonSavedStyled>{t('SPOT_UUID_ENTITY_SAVED_BUTTON')}</ButtonSavedStyled>;
  };

  return <IsSaveFunction />;
};
