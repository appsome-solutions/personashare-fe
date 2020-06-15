import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { PersonaCardMini } from 'components/Statistics/PersonaCardMini';
import { AgregatedPersona } from 'global/graphqls/schema';

export interface PropsType {
  visibilityOrNetworkQuery: any;
  showMore: boolean;
  spotOrPersona: AgregatedPersona;
  link: any;
}

const PersonaCardComponent = styled.div`
  margin-right: 8px;
`;

const ComponentWithTable = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

export const EntityPreviewWrapper: FC<PropsType> = ({ spotOrPersona, link }) => {
  const history = useHistory();

  return (
    <>
      <ComponentWithTable>
        <PersonaCardComponent key={spotOrPersona.uuid}>
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
        </PersonaCardComponent>
      </ComponentWithTable>
    </>
  );
};
