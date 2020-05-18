import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { AgregatedPersona } from 'global/graphqls/schema';
import { Spinner } from 'components/Spinner/Spinner';
import { Overlay } from 'components/Overlay/Overlay';
import { HamburgerMenu } from 'global/Layouts/HamburgerMenu/HamburgerMenu';
import { PersonaCard } from 'components/PersonaCard/PersonaCard';
import { GET_PERSONA, GetCardType } from 'global/graphqls/Persona';
import { useParams } from 'react-router-dom';

const ContactBookStyled = styled.div`
  margin: 30px 16px 40px 16px;
  height: 100vh;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContactBook: FC = () => {
  const { uuid } = useParams();

  const { loading, data } = useQuery<GetCardType>(GET_PERSONA, {
    variables: { uuid: uuid },
  });
  const [searchValue, setSearchValue] = useState('');

  if (loading) {
    return (
      <Overlay>
        <Spinner />
      </Overlay>
    );
  }

  const results = !searchValue
    ? data?.persona.participate
    : data?.persona.participate.filter(
        persona =>
          persona.card.name.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
          persona.card.description.toLowerCase().includes(searchValue.toLocaleLowerCase())
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
          <Wrapper key={persona.uuid}>
            <PersonaCard card={persona.card} uuid={persona.uuid} />
          </Wrapper>
        ))}
      </ContactBookStyled>
    </>
  );
};
