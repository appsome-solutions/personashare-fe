import { WideButton } from '../Button';
import React, { FC } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gqlUser } from 'global/graphqls/schema';
import { GET_USER } from 'global/graphqls/User';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { SAVE_SPOT, SaveSpotResponse } from 'global/graphqls/Spot';
import { GET_PERSONA, GetCardType } from 'global/graphqls/Persona';
import styled from 'styled-components';

const ButtonSavedStyled = styled(WideButton)`
  && {
    background-color: ${(props) => props.theme.colors.functional.disabled};
    &&:active,
    &&:hover {
      color: ${(props) => props.theme.colors.functional.disabled};
    }
  }
`;

export const SaveSpotButton: FC = () => {
  const { uuid } = useParams();
  const { data: userPersona } = useQuery<{ user: gqlUser }>(GET_USER);
  const { data, refetch } = useQuery<GetCardType>(GET_PERSONA, {
    variables: { uuid: userPersona?.user?.defaultPersona },
  });
  const [saveSpot] = useMutation<SaveSpotResponse>(SAVE_SPOT, {
    variables: {
      savedSpotUuid: uuid,
    },
  });

  if (!uuid || !data) {
    return null;
  }

  const onClickFunctions = async () => {
    await saveSpot();
    await refetch();
  };

  const IsSaveFunction = () => {
    if (!_.find(data?.persona.spotBook, { uuid })) {
      return <WideButton onClick={() => onClickFunctions()}>SAVE</WideButton>;
    } else return <ButtonSavedStyled>SAVED</ButtonSavedStyled>;
  };

  return <IsSaveFunction />;
};
