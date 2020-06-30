import React, { FC } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_PERSONA, GetCardType, SAVE_PERSONA, SavePersonaResponse } from 'global/graphqls/Persona';
import _ from 'lodash';
import styled from 'styled-components';
import { gqlUser } from 'global/graphqls/schema';
import { GET_USER } from 'global/graphqls/User';
import { WideButton } from 'components/Button';
import { useUserContext } from '../../global/UserContext/UserContext';
import { useTranslation } from 'react-i18next';

type SavePersonaUuid = {
  uuid: string;
};

const ButtonSavedStyled = styled(WideButton)`
  && {
    background-color: ${(props) => props.theme.colors.functional.disabled};
    &&:active,
    &&:hover {
      background-color: ${(props) => props.theme.colors.functional.disabled};
    }
  }
`;

export const SavePersona: FC<SavePersonaUuid> = ({ uuid }) => {
  const { user } = useUserContext();
  const { data, refetch } = useQuery<GetCardType>(GET_PERSONA, {
    variables: { uuid: user?.defaultPersona },
    skip: !user,
  });
  const [savePersona] = useMutation<SavePersonaResponse>(SAVE_PERSONA, {
    variables: {
      savedPersonaUuid: uuid,
    },
  });
  const { t } = useTranslation();

  const onClickFunctions = async () => {
    await savePersona();
    await refetch();
  };

  const IsSaveFunction = () => {
    if (!_.find(data?.persona?.contactBook, { uuid })) {
      return <WideButton onClick={() => onClickFunctions()}>{t('SPOT_UUID_ENTITY_BUTTON')}</WideButton>;
    } else return <ButtonSavedStyled>{t('SPOT_UUID_ENTITY_SAVED_BUTTON')}</ButtonSavedStyled>;
  };
  return <IsSaveFunction />;
};
