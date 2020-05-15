import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { gqlEntity } from 'global/graphqls/schema';
import { Spinner } from 'components/Spinner/Spinner';
import { Overlay } from 'components/Overlay/Overlay';
import { GET_SPOTS, GetSpotType } from 'global/graphqls/Spot';
import { HamburgerMenu } from '../../global/Layouts/HamburgerMenu/HamburgerMenu';
import { SpotPage } from '../SpotPage/SpotPage';

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
  const { loading, data } = useQuery<GetSpotType>(GET_SPOTS);
  const [searchValue, setSearchValue] = useState('');
  if (loading) {
    return (
      <Overlay>
        <Spinner />
      </Overlay>
    );
  }

  if (!data) {
    return null;
  }

  const results = !searchValue
    ? data?.userSpots
    : data?.userSpots.filter(
        userSpots =>
          userSpots.card.name.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
          userSpots.card.description.toLowerCase().includes(searchValue.toLocaleLowerCase())
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
        {results?.map((spot: gqlEntity) => (
          <Wrapper key={spot.uuid}>
            <DateOfSave>14.10.2019</DateOfSave>
            <SpotPage card={spot.card} uuid={spot.uuid} isWithEdit={true} />
          </Wrapper>
        ))}
      </SpotBookStyled>
    </>
  );
};
