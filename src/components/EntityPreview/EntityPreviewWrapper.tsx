import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { PersonaCardMini } from 'components/Statistics/PersonaCardMini';
import { AgregatedPersona } from 'global/graphqls/schema';
import { APP_ROUTES } from '../../global/AppRouter/routes';

export interface PropsType {
  visibilityOrNetworkQuery: any;
  spotOrPersona: AgregatedPersona;
}

export const EntityPreviewWrapper: FC<PropsType> = ({ spotOrPersona }) => {
  const history = useHistory();

  return (
    <PersonaCardMini
      card={spotOrPersona.card}
      uuid={spotOrPersona.uuid}
      key={spotOrPersona.uuid}
      onClick={() =>
        history.push({
          pathname: `${APP_ROUTES.PERSONA_PREVIEW(spotOrPersona.uuid)}`,
        })
      }
    />
  );
};
