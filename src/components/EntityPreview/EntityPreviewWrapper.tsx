import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { PersonaCardMini } from 'components/Statistics/PersonaCardMini';
import { AgregatedPersona } from 'global/graphqls/schema';

export interface PropsType {
  visibilityOrNetworkQuery: any;
  spotOrPersona: AgregatedPersona;
  link: any;
}

export const EntityPreviewWrapper: FC<PropsType> = ({ spotOrPersona, link }) => {
  const history = useHistory();

  return (
    <PersonaCardMini
      card={spotOrPersona.card}
      uuid={spotOrPersona.uuid}
      key={spotOrPersona.uuid}
      onClick={() =>
        history.push({
          pathname: `${link(spotOrPersona.uuid)}`,
        })
      }
    />
  );
};
