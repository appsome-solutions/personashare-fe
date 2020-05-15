import { WideButton } from '../Button';
import React, { FC } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_PERSONA, GetCardType, SAVE_PERSONA, SavePersonaResponse } from 'global/graphqls/Persona';
import { gqlUser } from 'global/graphqls/schema';
import { GET_USER } from 'global/graphqls/User';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import styled from 'styled-components';

const ButtonSavedStyled = styled(WideButton)`
  && {
    background-color: ${props => props.theme.colors.functional.disabled};
    &&:active,
    &&:hover {
      background-color: ${props => props.theme.colors.functional.disabled};
    }
  }
`;

export const SavePersona: FC = () => {
  const { uuid } = useParams();
  const { data: userPersona } = useQuery<{ user: gqlUser }>(GET_USER);
  const { data, refetch } = useQuery<GetCardType>(GET_PERSONA, {
    variables: { uuid: userPersona?.user?.defaultPersona },
  });
  const [savePersona] = useMutation<SavePersonaResponse>(SAVE_PERSONA, {
    variables: {
      savedPersonaUuid: uuid,
      personaUuid: userPersona?.user?.defaultPersona,
    },
  });

  if (!uuid || !data) {
    return null;
  }

  const onClickFunctions = async () => {
    await savePersona();
    await refetch();
  };

  const IsSaveFunction = () => {
    if (!_.find(data?.persona.visibilityList, { uuid })) {
      return <WideButton onClick={() => onClickFunctions()}>SAVE</WideButton>;
    } else return <ButtonSavedStyled>SAVED</ButtonSavedStyled>;
  };
  return <IsSaveFunction />;
};
