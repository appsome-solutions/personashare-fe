import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { Spinner } from 'components/Spinner/Spinner';
import { Overlay } from 'components/Overlay/Overlay';
import { HamburgerMenu } from '../../global/Layouts/HamburgerMenu/HamburgerMenu';
import { SpotPage } from '../SpotPage/SpotPage';
import { useHistory } from 'react-router-dom';
import { APP_ROUTES } from '../../global/AppRouter/routes';
import { GET_PERSONA, GetCardType } from '../../global/graphqls/Persona';
import { AgregatedSpot, gqlUser } from 'global/graphqls/schema';
import { GET_USER } from '../../global/graphqls/User';

const SpotBookStyled = styled.div`
  margin: 24px 16px 32px 16px;
  height: 100vh;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const DateOfSave = styled.div`
  margin-bottom: 8px;
`;

export const SpotBook: FC = () => {
  const { data: userPersona } = useQuery<{ user: gqlUser }>(GET_USER);
  const { data, loading } = useQuery<GetCardType>(GET_PERSONA, {
    variables: { uuid: userPersona?.user?.defaultPersona },
  });
  const [searchValue, setSearchValue] = useState('');
  const history = useHistory();

  if (loading) {
    return (
      <Overlay>
        <Spinner />
      </Overlay>
    );
  }

  const results = !searchValue
    ? data?.persona.spotBook
    : data?.persona.spotBook.filter(
        spotBook =>
          spotBook.card.name.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
          spotBook.card.description.toLowerCase().includes(searchValue.toLocaleLowerCase())
      );

  return (
    <>
      <HamburgerMenu
        isWithHamburger={true}
        isWithSearch={true}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <SpotBookStyled>
        {results?.map((spot: AgregatedSpot) => (
          <Wrapper
            key={spot.uuid}
            onClick={() =>
              history.push({
                pathname: `${APP_ROUTES.SPOT_PREVIEW(spot.uuid)}`,
              })
            }
          >
            <DateOfSave>14.10.2019</DateOfSave>
            <SpotPage card={spot.card} uuid={spot.uuid} isWithEdit={true} />
          </Wrapper>
        ))}
      </SpotBookStyled>
    </>
  );
};
