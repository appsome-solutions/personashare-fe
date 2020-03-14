import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { TopNav } from 'components/TopNav/TopNav';
import { PageWrapperSpaceBetween } from 'components/PageWrapper';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_PERSONAS, GetPersonaType, SET_DEFAULT_PERSONA } from 'global/graphqls/Persona';
import { PersonaCard } from 'components/PersonaCard/PersonaCard';
import { Button } from 'components/Button';
import Carousel from 'components/Carousel/Carousel';
import { useUserContext } from 'global/UserContext/UserContext';
import { gqlPersona } from 'global/graphqls/schema';
import { Spinner } from 'components/Spinner/Spinner';
import { Overlay } from 'components/Overlay/Overlay';

const StyledButton = styled(Button)`
  width: 80%;
  margin-left: auto;
  margin-right: auto;
`;

const DefaultBlock = styled.div`
  width: 82px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  font-weight: 600;
  color: ${props => props.theme.colors.utils.text.dark};
  background-color: rgba(85, 133, 255, 0.4);
  border: 1px solid rgba(85, 133, 255, 0.2);
  border-radius: 5px;
`;

const ShareButton = styled(StyledButton)`
  margin-top: auto;
`;

const CaruouselItem = styled.div`
  padding: 0 20px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 70vh;
`;

export const Personas: FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { loading, data } = useQuery<GetPersonaType>(GET_PERSONAS);
  const [setDefaultPersona] = useMutation(SET_DEFAULT_PERSONA);
  const { user } = useUserContext();
  const [defaultPersonaUuid, setDefaultPersonaUuid] = useState(user?.defaultPersona);
  if (loading) {
    return (
      <Overlay>
        <Spinner />
      </Overlay>
    );
  }
  if (!data) {
    return <div>No personas...</div>;
  }
  const handleSetDefault = async (uuid: string): Promise<void> => {
    try {
      const { data } = await setDefaultPersona({ variables: { uuid: uuid } });
      setDefaultPersonaUuid(data.setDefaultPersona.uuid);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <TopNav isWithBackArrow />
      <PageWrapperSpaceBetween>
        <Carousel afterChange={setCurrentSlide}>
          {data.personas &&
            data.personas.map((persona: gqlPersona) => (
              <CaruouselItem key={persona.uuid}>
                <Wrapper>
                  <PersonaCard card={persona.card} />
                  {persona.uuid === defaultPersonaUuid ? (
                    <DefaultBlock>DEFAULT</DefaultBlock>
                  ) : (
                    <StyledButton onClick={() => handleSetDefault(persona.uuid)}>CHOOSE AS DEFAULT</StyledButton>
                  )}
                  <ShareButton>SHARE</ShareButton>
                </Wrapper>
              </CaruouselItem>
            ))}
        </Carousel>
        <img src={`${data.personas[currentSlide].qrCodeLink}`} />
        {currentSlide}
      </PageWrapperSpaceBetween>
    </div>
  );
};
