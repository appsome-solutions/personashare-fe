import React, { FC, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Carousel as AntCarousel } from 'antd';
import { useLocation } from 'react-router-dom';
import { TopNav } from 'components/TopNav/TopNav';
import { PageWrapperSpaceBetween } from 'components/PageWrapper';
import { useQuery, useMutation } from '@apollo/react-hooks';
import isEmpty from 'lodash/isEmpty';
import { client } from 'global/ApolloClient/ApolloClient';
import {
  GET_PERSONAS,
  GetPersonaType,
  SET_DEFAULT_PERSONA,
  RECOMMEND_PERSONA,
  SetDefaultPersonaResponse,
  RecommendPersonaResponse,
  SAVE_PERSONA,
  SavePersonaResponse,
} from 'global/graphqls/Persona';
import { PersonaCard } from 'components/PersonaCard/PersonaCard';
import { Button } from 'components/Button';
import Carousel from 'components/Carousel/Carousel';
import { useUserContext } from 'global/UserContext/UserContext';
import { gqlEntity } from 'global/graphqls/schema';
import { Spinner } from 'components/Spinner/Spinner';
import { Overlay } from 'components/Overlay/Overlay';
import { getPathnameArray } from 'helpers/url';
import { ExecutionResult } from 'graphql';
import { partial } from 'helpers/functional';
import {
  RECOMMEND_SPOT,
  RecommendSpotResponse,
  PARTICIPATE,
  ParticipateResponse,
  ADD_MENAGER,
  AddManagerResponse,
} from 'global/graphqls/Spot';

const StyledButton = styled(Button as any)`
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
  color: ${(props) => props.theme.colors.utils.text.dark};
  background-color: rgba(85, 133, 255, 0.4);
  border: 1px solid rgba(85, 133, 255, 0.2);
  border-radius: 5px;
`;

const ShareButton = styled(StyledButton as any)`
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

const callPersonaMutation = (
  action: string,
  personaId: string,
  selectedPersonaId: string
): Promise<ExecutionResult<RecommendPersonaResponse | SavePersonaResponse>> | null => {
  const savePersona = partial(client.mutate, { mutation: SAVE_PERSONA });
  const recommendPersona = partial(client.mutate, { mutation: RECOMMEND_PERSONA });
  switch (action) {
    case 'saved':
      return savePersona({
        variables: {
          savedPersonaUuid: personaId,
          personaId: selectedPersonaId,
        },
      });
    case 'recommend':
      return recommendPersona({
        variables: {
          recommendedPersonaUuid: personaId,
          personaUuid: selectedPersonaId,
        },
      });
    default:
      return null;
  }
};

const callSpotMutation = (
  action: string,
  spotId: string,
  selectedPersonaId: string
): Promise<ExecutionResult<RecommendSpotResponse | ParticipateResponse | AddManagerResponse>> | null => {
  const recommendSpot = partial(client.mutate, { mutation: RECOMMEND_SPOT });
  const participate = partial(client.mutate, { mutation: PARTICIPATE });
  const addMenager = partial(client.mutate, { mutation: ADD_MENAGER });
  switch (action) {
    case 'recommended':
      return recommendSpot({
        variables: {
          recommendedSpotUuid: spotId,
          personaUuid: selectedPersonaId,
        },
      });
    case 'participant-joined':
      return participate({
        variables: {
          personaId: selectedPersonaId,
          spotId,
        },
      });
    case 'manager-joined':
      return addMenager({
        variables: {
          personaId: selectedPersonaId,
          spotId,
        },
      });
    default:
      return null;
  }
};

export const ChoosePersona: FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { loading, data } = useQuery<GetPersonaType>(GET_PERSONAS);
  const [setDefaultPersona] = useMutation<SetDefaultPersonaResponse>(SET_DEFAULT_PERSONA);
  const { user } = useUserContext();
  const [defaultPersonaUuid, setDefaultPersonaUuid] = useState(user?.defaultPersona);
  const { pathname } = useLocation();
  const carousel = useRef<AntCarousel>(null);

  useEffect(() => {
    setDefaultPersonaUuid(user?.defaultPersona);
  }, [user]);

  useEffect(() => {
    if (data?.userPersonas) {
      const defaultPersonaIndex = data.userPersonas.findIndex((persona) => persona.uuid === defaultPersonaUuid);
      const goToIndex = defaultPersonaIndex === -1 ? 0 : defaultPersonaIndex;
      setCurrentSlide(goToIndex);
      carousel.current?.goTo(goToIndex);
    }
  }, [data, defaultPersonaUuid]);

  const handleShare = (): void => {
    const pathnameArray = getPathnameArray(pathname);
    if (!data) {
      return;
    }
    const actionType = pathnameArray[2];
    const actionId = pathnameArray[4];
    if (pathnameArray.includes('persona')) {
      callPersonaMutation(actionType, actionId, data.userPersonas[currentSlide].uuid);
    }
    if (pathnameArray.includes('spot')) {
      callSpotMutation(actionType, actionId, data.userPersonas[currentSlide].uuid);
    }
    return;
  };

  if (loading) {
    return (
      <Overlay>
        <Spinner />
      </Overlay>
    );
  }
  // OR !data is used cause typescript doesn't know that data can no longer be undefined in return method
  if (isEmpty(data?.userPersonas) || !data) {
    return <div>No personas...</div>;
  }
  const handleSetDefault = async (uuid: string): Promise<void> => {
    try {
      const { data } = await setDefaultPersona({ variables: { uuid: uuid } });
      setDefaultPersonaUuid(data?.setDefaultPersona.uuid);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <TopNav isWithBackArrow />
      <PageWrapperSpaceBetween>
        <Carousel afterChange={setCurrentSlide} ref={carousel}>
          {data.userPersonas &&
            data.userPersonas.map((persona: gqlEntity) => (
              <CaruouselItem key={persona.uuid}>
                <Wrapper>
                  <PersonaCard card={persona.card} uuid={persona.uuid} />
                  {persona.uuid === defaultPersonaUuid ? (
                    <DefaultBlock>DEFAULT</DefaultBlock>
                  ) : (
                    <StyledButton onClick={() => handleSetDefault(persona.uuid)}>CHOOSE AS DEFAULT</StyledButton>
                  )}
                  <ShareButton onClick={handleShare}>SHARE</ShareButton>
                </Wrapper>
              </CaruouselItem>
            ))}
        </Carousel>
      </PageWrapperSpaceBetween>
    </div>
  );
};
