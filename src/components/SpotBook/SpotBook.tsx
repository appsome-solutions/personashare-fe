import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { Spinner } from 'components/Spinner/Spinner';
import { Overlay } from 'components/Overlay/Overlay';
import { HamburgerMenu } from 'global/Layouts/HamburgerMenu/HamburgerMenu';
import { SpotPage } from 'components/SpotPage/SpotPage';
import { useHistory } from 'react-router-dom';
import { APP_ROUTES } from 'global/AppRouter/routes';
import { GET_PERSONA, GetCardType } from 'global/graphqls/Persona';
import { AgregatedSpot } from 'global/graphqls/schema';
import { RecentlyViewedSpots } from './RecentlyViewedSpots';
import { useUserContext } from '../../global/UserContext/UserContext';
import { TopNav } from '../TopNav/TopNav';
import { EmptyPlaceholder } from '../EmptyPlaceholder/EmptyPlaceholder';
import { useTranslation } from 'react-i18next';
import { StickyNavigation } from '../../global/Layouts/StickyNavigation/StickyNavigation';

const SpotBookStyled = styled.div`
  padding: 24px 16px 32px 16px;
  min-height: ${(props) => props.theme.contentHeight};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledHeader = styled.h6`
  margin-top: 32px;
`;

export const SpotBook: FC = () => {
  const { user } = useUserContext();
  const { data, loading } = useQuery<GetCardType>(GET_PERSONA, {
    variables: { uuid: user?.defaultPersona },
    skip: !user,
  });
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState('');
  const history = useHistory();

  // todo: think about better solution
  if (user && !user.defaultPersona) {
    history.push(APP_ROUTES.PERSONA_CREATION_STEP_1);
  }

  if (loading) {
    return (
      <Overlay>
        <Spinner />
      </Overlay>
    );
  }

  const results = !searchValue
    ? data?.persona?.spotBook
    : data?.persona?.spotBook.filter(
        (spotBook) =>
          spotBook.card.name.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
          spotBook.card.description.toLowerCase().includes(searchValue.toLocaleLowerCase())
      );

  return (
    <>
      {data ? (
        <HamburgerMenu
          isWithHamburger={true}
          isWithSearch={true}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          card={data.persona?.card}
        />
      ) : (
        <TopNav isWithBackArrow />
      )}
      <SpotBookStyled>
        <RecentlyViewedSpots />
        <StyledHeader>{t('SPOT_BOOK_HEADING_1')}</StyledHeader>
        {!results?.length && <EmptyPlaceholder text={t('NO_SAVED_SPOT')} />}
        {results?.map((spot: AgregatedSpot) => (
          <Wrapper
            key={spot.uuid}
            onClick={() =>
              history.push({
                pathname: `${APP_ROUTES.SPOT_PREVIEW(spot.uuid)}`,
              })
            }
          >
            <SpotPage card={spot.card} uuid={spot.uuid} isWithEdit={false} />
          </Wrapper>
        ))}
      </SpotBookStyled>
      <StickyNavigation />
    </>
  );
};
