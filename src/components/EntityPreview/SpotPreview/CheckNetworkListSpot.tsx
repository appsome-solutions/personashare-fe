import { APP_ROUTES } from 'global/AppRouter/routes';
import { AgregatedPersona, gqlUser } from 'global/graphqls/schema';
import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_USER } from 'global/graphqls/User';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { PersonaCardMini } from 'components/Statistics/PersonaCardMini';
import { GET_SPOT, GetCardType } from 'global/graphqls/Spot';

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

export const CheckNetworkListSpot = () => {
  const { data: userPersona } = useQuery<{ user: gqlUser }>(GET_USER);
  const { data } = useQuery<GetCardType>(GET_SPOT, {
    variables: { uuid: userPersona?.user?.defaultPersona },
  });
  const history = useHistory();
  const [showMore, setShowMore] = useState(false);

  const handleClick = () => {
    setShowMore(true);
  };
  const NumberOfNetworkList = showMore ? data?.spot.networkList.length : 4;

  const CheckNetworkList = () => {
    if (!data?.spot?.networkList) {
      return (
        <>
          <HowManyUsers>0 spots saved your profile</HowManyUsers>
          <ComponentWithTable>
            {data?.spot?.networkList.slice(0, NumberOfNetworkList).map((spot: AgregatedPersona) => (
              <PersonaCardComponent key={spot.uuid}>
                <PersonaCardMini
                  card={spot.card}
                  uuid={spot.uuid}
                  key={spot.uuid}
                  onClick={() =>
                    history.push({
                      pathname: `${APP_ROUTES.SPOT_PREVIEW(spot.uuid)}`,
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
          <HowManyUsers>{data?.spot?.networkList?.length} spots saved your profile</HowManyUsers>
          <ComponentWithTable>
            {data?.spot?.networkList.slice(0, NumberOfNetworkList).map((spot: AgregatedPersona) => (
              <PersonaCardComponent key={spot.uuid}>
                <PersonaCardMini
                  card={spot.card}
                  uuid={spot.uuid}
                  key={spot.uuid}
                  onClick={() =>
                    history.push({
                      pathname: `${APP_ROUTES.SPOT_PREVIEW(spot.uuid)}`,
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
  return <CheckNetworkList />;
};
