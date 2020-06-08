import { AgregatedPersona, gqlUser } from 'global/graphqls/schema';
import { APP_ROUTES } from 'global/AppRouter/routes';
import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_USER } from 'global/graphqls/User';
import { GET_PERSONA, GetCardType } from 'global/graphqls/Persona';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { PersonaCardMini } from 'components/Statistics/PersonaCardMini';

const HowManyUsers = styled.div`
  ${(props) => props.theme.typography.body1}
`;

const PersonaCardComponent = styled.div`
  margin-right: 8px;
`;

const SeeMoreText = styled.a`
  text-decoration-line: underline;
  text-align: center;
`;

const ComponentWithTable = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

export const CheckNetworkListPersona = () => {
  const { data: userPersona } = useQuery<{ user: gqlUser }>(GET_USER);
  const { data } = useQuery<GetCardType>(GET_PERSONA, {
    variables: { uuid: userPersona?.user?.defaultPersona },
  });
  const history = useHistory();
  const [showMore, setShowMore] = useState(false);

  const handleClick = () => {
    setShowMore(true);
  };
  const NumberOfNetworkList = showMore ? data?.persona.networkList.length : 4;

  const CheckNetwork = () => {
    if (!data?.persona?.networkList) {
      return (
        <>
          <HowManyUsers>0 persons saved your profile</HowManyUsers>
          <ComponentWithTable>
            {data?.persona?.networkList.slice(0, NumberOfNetworkList).map((persona: AgregatedPersona) => (
              <PersonaCardComponent key={persona.uuid}>
                <PersonaCardMini
                  card={persona.card}
                  uuid={persona.uuid}
                  key={persona.uuid}
                  onClick={() =>
                    history.push({
                      pathname: `${APP_ROUTES.PERSONA_PREVIEW(persona.uuid)}`,
                    })
                  }
                />
              </PersonaCardComponent>
            ))}
          </ComponentWithTable>
        </>
      );
    } else {
      return (
        <>
          <HowManyUsers>{data?.persona?.networkList?.length} persons saved your profile</HowManyUsers>
          <ComponentWithTable>
            {data?.persona?.networkList.slice(0, NumberOfNetworkList).map((persona: AgregatedPersona) => (
              <PersonaCardComponent key={persona.uuid}>
                <PersonaCardMini
                  card={persona.card}
                  uuid={persona.uuid}
                  key={persona.uuid}
                  onClick={() =>
                    history.push({
                      pathname: `${APP_ROUTES.PERSONA_PREVIEW(persona.uuid)}`,
                    })
                  }
                />
              </PersonaCardComponent>
            ))}
          </ComponentWithTable>
          <SeeMoreText onClick={handleClick}>SEE MORE</SeeMoreText>
        </>
      );
    }
  };
  return <CheckNetwork />;
};
