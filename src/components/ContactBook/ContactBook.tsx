import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { gqlEntity } from 'global/graphqls/schema';
import { Spinner } from 'components/Spinner/Spinner';
import { Overlay } from 'components/Overlay/Overlay';
import { HamburgerMenu } from '../../global/Layouts/HamburgerMenu/HamburgerMenu';
import { PersonaCard } from '../PersonaCard/PersonaCard';
import { GET_PERSONAS, GetPersonaType } from '../../global/graphqls/Persona';

const ContactBookStyled = styled.div`
  margin: 24px 16px 32px 16px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContactBook: FC = () => {
  const { loading, data } = useQuery<GetPersonaType>(GET_PERSONAS);
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
    ? data.userPersonas
    : data.userPersonas.filter(
        userPersonas =>
          userPersonas.card.name.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
          userPersonas.card.description.toLowerCase().includes(searchValue.toLocaleLowerCase())
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
        {results.map((persona: gqlEntity) => (
          <Wrapper key={persona.uuid}>
            <PersonaCard card={persona.card} uuid={persona.uuid} />
          </Wrapper>
        ))}
      </ContactBookStyled>
    </>
  );
};