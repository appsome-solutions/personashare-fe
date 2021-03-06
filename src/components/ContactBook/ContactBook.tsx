import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { Spinner } from 'components/Spinner/Spinner';
import { Overlay } from 'components/Overlay/Overlay';
import { HamburgerMenu } from 'global/Layouts/HamburgerMenu/HamburgerMenu';
import { PersonaCard } from 'components/PersonaCard/PersonaCard';
import { GET_PERSONA, GetCardType } from 'global/graphqls/Persona';
import { APP_ROUTES } from 'global/AppRouter/routes';
import { useHistory } from 'react-router-dom';
import { AgregatedPersona } from 'global/graphqls/schema';
import { RecentlyViewedPersonas } from './RecentlyViewedPersonas';
import { useUserContext } from '../../global/UserContext/UserContext';
import { TopNav } from '../TopNav/TopNav';
import { EmptyPlaceholder } from '../EmptyPlaceholder/EmptyPlaceholder';
import { useTranslation } from 'react-i18next';
import { StickyNavigation } from '../../global/Layouts/StickyNavigation/StickyNavigation';

const ContactBookStyled = styled.div`
  padding: 30px 16px 40px 16px;
  min-height: ${(props) => props.theme.contentHeight};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledHeader = styled.h6`
  margin-top: 32px;
`;

export const ContactBook: FC = () => {
  const { t } = useTranslation();
  const { user } = useUserContext();
  const { data, loading } = useQuery<GetCardType>(GET_PERSONA, {
    variables: { uuid: user?.defaultPersona },
    skip: !user || !user.defaultPersona,
  });
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
    ? data?.persona.contactBook
    : data?.persona.contactBook.filter(
        (contactBook) =>
          contactBook.card.name.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
          contactBook.card.description.toLowerCase().includes(searchValue.toLocaleLowerCase())
      );
  return (
    <>
      {data ? (
        <HamburgerMenu
          isWithHamburger={true}
          isWithSearch={true}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          card={data.persona.card}
        />
      ) : (
        <TopNav isWithBackArrow />
      )}
      <ContactBookStyled>
        <RecentlyViewedPersonas />
        <StyledHeader>{t('CONTACT_BOOK_HEADING_1')}</StyledHeader>
        {!results?.length && <EmptyPlaceholder text={t('NO_SAVED_SPOT')} />}
        {results?.map((persona: AgregatedPersona) => (
          <Wrapper
            key={persona.uuid}
            onClick={() =>
              history.push({
                pathname: `${APP_ROUTES.PERSONA_PREVIEW(persona.uuid)}`,
              })
            }
          >
            <PersonaCard card={persona.card} uuid={persona.uuid} />
          </Wrapper>
        ))}
      </ContactBookStyled>
      <StickyNavigation />
    </>
  );
};
