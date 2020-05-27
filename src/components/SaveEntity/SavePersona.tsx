import React, { FC } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_PERSONA, GetCardType, SAVE_PERSONA, SavePersonaResponse } from 'global/graphqls/Persona';
import _ from 'lodash';
import styled from 'styled-components';
import { gqlUser } from 'global/graphqls/schema';
import { GET_USER } from 'global/graphqls/User';
import { WideButton } from 'components/Button';

type SavePersonaUuid = {
  uuid: string;
};

const ButtonSavedStyled = styled(WideButton as any)`
  && {
    background-color: ${(props) => props.theme.colors.functional.disabled};
    &&:active,
    &&:hover {
      background-color: ${(props) => props.theme.colors.functional.disabled};
    }
  }
`;

export const SavePersona: FC<SavePersonaUuid> = ({ uuid }) => {
  const { data: userPersona } = useQuery<{ user: gqlUser }>(GET_USER);
  const { data, refetch } = useQuery<GetCardType>(GET_PERSONA, {
    variables: { uuid: userPersona?.user?.defaultPersona },
  });
  const [savePersona] = useMutation<SavePersonaResponse>(SAVE_PERSONA, {
    variables: {
      savedPersonaUuid: uuid,
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
    if (!_.find(data?.persona?.contactBook, { uuid })) {
      return <WideButton onClick={() => onClickFunctions()}>SAVE</WideButton>;
    } else return <ButtonSavedStyled>SAVED</ButtonSavedStyled>;
  };
  return <IsSaveFunction />;
};
