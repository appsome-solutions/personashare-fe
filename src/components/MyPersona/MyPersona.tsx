import React, { FC, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Carousel as AntCarousel } from 'antd';
import { TopNav } from 'components/TopNav/TopNav';
import { PageWrapperSpaceBetween } from 'components/PageWrapper';
import { useQuery, useMutation } from '@apollo/react-hooks';
import isEmpty from 'lodash/isEmpty';
import { GET_PERSONAS, GetPersonaType, SET_DEFAULT_PERSONA, SetDefaultPersonaResponse } from 'global/graphqls/Persona';
import { PersonaCard } from 'components/PersonaCard/PersonaCard';
import { Button } from 'components/Button';
import Carousel from 'components/Carousel/Carousel';
import { useUserContext } from 'global/UserContext/UserContext';
import { gqlEntity } from 'global/graphqls/schema';
import { Spinner } from 'components/Spinner/Spinner';
import { Overlay } from 'components/Overlay/Overlay';
import { NavLink } from 'react-router-dom';
import AddIcon from 'assets/AddIcon.svg';
import ShareQrCode from 'assets/ShareQrCode.svg';

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

const CaruouselItem = styled.div`
  padding: 0 20px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CreatePersona = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  position: fixed;
  bottom: 66px;
  right: 18px;
  background-color: ${props => props.theme.colors.main.primary};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ShareQr = styled.div`
  margin-top: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  flex-direction: column;
`;

const TextInShare = styled.div`
  ${props => props.theme.typography.subtitle2};
  margin-bottom: 20px;
`;

const ShareQrIcon = styled.img`
  padding-right: 12px;
`;

export const MyPersona: FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { loading, data } = useQuery<GetPersonaType>(GET_PERSONAS);
  const [setDefaultPersona] = useMutation<SetDefaultPersonaResponse>(SET_DEFAULT_PERSONA);
  const { user } = useUserContext();
  const [defaultPersonaUuid, setDefaultPersonaUuid] = useState(user?.defaultPersona);
  const carousel = useRef<AntCarousel>(null);

  useEffect(() => {
    if (data?.userPersonas) {
      const defaultPersonaIndex = data.userPersonas.findIndex(persona => persona.uuid === defaultPersonaUuid);
      const goToIndex = defaultPersonaIndex === -1 ? 0 : defaultPersonaIndex;
      setCurrentSlide(goToIndex);
      carousel.current?.goTo(goToIndex);
    }
  }, [data, defaultPersonaUuid]);

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
                  <PersonaCard card={persona.card} uuid={persona.uuid} isWithEdit={true} />
                  {persona.uuid === defaultPersonaUuid ? (
                    <DefaultBlock>DEFAULT</DefaultBlock>
                  ) : (
                    <StyledButton onClick={() => handleSetDefault(persona.uuid)}>SET AS DEFAULT</StyledButton>
                  )}
                </Wrapper>
              </CaruouselItem>
            ))}
        </Carousel>
        <ShareQr>
          <img src={`${data.userPersonas[currentSlide].qrCodeLink}`} />
          <TextInShare>
            <ShareQrIcon src={ShareQrCode} alt="Share Qr Code" />
            <a href={`${data.userPersonas[currentSlide].qrCodeLink}`} download="output.png">
              Share your QR
            </a>
          </TextInShare>
        </ShareQr>
      </PageWrapperSpaceBetween>
      <NavLink to="./createpersona">
        <CreatePersona>
          <img src={AddIcon} alt="Create Icon" />
        </CreatePersona>
      </NavLink>
    </div>
  );
};
