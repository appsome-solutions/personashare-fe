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
import { AgregatedPersona, gqlUser } from 'global/graphqls/schema';
import { GET_USER } from 'global/graphqls/User';

const ContactBookStyled = styled.div`
  padding: 30px 16px 40px 16px;
  min-height: ${(props) => props.theme.contentHeight};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContactBook: FC = () => {
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
    ? data?.persona.contactBook
    : data?.persona.contactBook.filter(
        (contactBook) =>
          contactBook.card.name.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
          contactBook.card.description.toLowerCase().includes(searchValue.toLocaleLowerCase())
      );
  return (
    <>
      <HamburgerMenu
        isWithHamburger={true}
        isWithSearch={true}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <ContactBookStyled>
        <h6>Your Saved Persona</h6>
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
    </>
  );
};
