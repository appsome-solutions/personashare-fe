import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { TopNav } from 'components/TopNav/TopNav';
import { PageWrapperSpaceBetween } from 'components/PageWrapper';
import { useQuery } from '@apollo/react-hooks';
import { GET_PERSONAS, GetPersonaType } from 'global/graphqls/Persona';
import { PersonaCard } from 'components/PersonaCard/PersonaCard';
import { Button } from 'components/Button';
import Carousel from 'components/Carousel/Carousel';

const StyledButton = styled(Button)`
  width: 80%;
  margin-left: auto;
  margin-right: auto;
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

  if (loading) {
    return <div>Loading</div>;
  }
  if (!data) {
    return <div>No personas...</div>;
  }
  data.personas = [...data.personas, ...data.personas];
  data.personas = [...data.personas, ...data.personas];

  return (
    <div>
      <TopNav isWithBackArrow />
      <PageWrapperSpaceBetween>
        <Carousel afterChange={setCurrentSlide}>
          {data.personas &&
            data.personas.map(persona => (
              <CaruouselItem key={persona.uuid}>
                <Wrapper>
                  <PersonaCard uuid={persona.uuid} card={persona.card!} />
                  <StyledButton>CHOOSE AS DEFAULT</StyledButton>
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
