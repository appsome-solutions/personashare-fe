import React, { FC, useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { Carousel as AntCarousel } from 'antd';
import { TopNav } from 'components/TopNav/TopNav';
import { PageWrapper, PageWrapperSpaceBetween } from 'components/PageWrapper';
import { useQuery, useMutation } from '@apollo/react-hooks';
import isEmpty from 'lodash/isEmpty';
import { GET_PERSONAS, GetPersonaType, SET_DEFAULT_PERSONA, SetDefaultPersonaResponse } from 'global/graphqls/Persona';
import { PersonaCard } from 'components/PersonaCard/PersonaCard';
import { Button } from 'components/Button';
import Carousel from 'components/Carousel/Carousel';
import { useUserContext } from 'global/UserContext/UserContext';
import { AgregatedPersona, gqlEntity } from 'global/graphqls/schema';
import { NavLink, useHistory } from 'react-router-dom';
import AddIcon from 'assets/AddIcon.svg';
import { APP_ROUTES } from 'global/AppRouter/routes';
import { MySpotsWithoutSpots } from '../MySpots/MySpotsWithoutSpots';
import { Loader } from '../Loader/Loader';
import { ShareQrComponent } from './ShareQrComponent';
import { LoginOrHamburger } from '../QrScanner/LoginOrHamburger';
import { GET_USER } from '../../global/graphqls/User';

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
  color: ${(props) => props.theme.colors.utils.text.dark};
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
  .slick-active {
    margin-bottom: 10px;
  }
  align-items: center;
`;

const CreatePersona = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  position: fixed;
  bottom: 66px;
  right: 18px;
  background-color: ${(props) => props.theme.colors.main.primary};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledPageWrapper = styled(PageWrapper)`
  padding: 0;
`;

export const MyPersona: FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { loading, data } = useQuery<{ userPersonas: Array<AgregatedPersona> }>(GET_PERSONAS);
  const [setDefaultPersona, { loading: isSetDefaultPersonaLoading }] = useMutation<SetDefaultPersonaResponse>(
    SET_DEFAULT_PERSONA
  );
  const { user, setUser } = useUserContext();
  //todo: remove this unecessary state
  const [defaultPersonaUuid, setDefaultPersonaUuid] = useState(user?.defaultPersona);
  const carousel = useRef<AntCarousel>(null);
  const history = useHistory();

  const handleSetDefault = async (persona: AgregatedPersona): Promise<void> => {
    try {
      if (!user) {
        return;
      }

      const { data } = await setDefaultPersona({
        variables: { uuid: persona.uuid },
        update(cache, { data }) {
          if (!data) {
            return;
          }
          const {
            setDefaultPersona: { uuid },
          } = data;
          const { user } = cache.readQuery({ query: GET_USER }) as { user: any };
          cache.writeQuery({
            query: GET_USER,
            data: {
              user: {
                ...user,
                photo: persona.card.avatar ? persona.card.avatar : '',
                defaultPersona: uuid,
              },
            },
          });
        },
      });
      setDefaultPersonaUuid(data?.setDefaultPersona.uuid);
      setUser({
        ...user,
        photo: persona.card.avatar ? persona.card.avatar : '',
        defaultPersona: persona.uuid,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (data?.userPersonas) {
      const defaultPersonaIndex = data.userPersonas.findIndex((persona) => persona.uuid === user?.defaultPersona);
      const goToIndex = defaultPersonaIndex === -1 ? 0 : defaultPersonaIndex;
      setCurrentSlide(goToIndex);
      carousel.current?.goTo(goToIndex);
    }
  }, [data, defaultPersonaUuid, user?.defaultPersona]);

  const renderCarousel = useCallback(
    (userPersonas) => (
      <StyledCarousel
        ref={carousel}
        afterChange={(currentIndex) => {
          setCurrentSlide(currentIndex);
        }}
      >
        {userPersonas.map((persona: AgregatedPersona) => (
          <CaruouselItem key={persona.uuid}>
            <Wrapper>
              <PersonaCard
                card={persona.card}
                uuid={persona.uuid}
                isWithEdit={true}
                isDefaultPersona={persona.uuid === user?.defaultPersona}
                onClick={() =>
                  history.push({
                    pathname: `${APP_ROUTES.MY_PERSONA_PREVIEW(persona.uuid)}`,
                  })
                }
              />
              {persona.uuid === user?.defaultPersona ? (
                <DefaultBlock>DEFAULT</DefaultBlock>
              ) : (
                <StyledButton onClick={() => handleSetDefault(persona)}>SET AS DEFAULT</StyledButton>
              )}
            </Wrapper>
          </CaruouselItem>
        ))}
      </StyledCarousel>
    ),
    [data?.userPersonas, user?.defaultPersona]
  );

  // OR !data is used cause typescript doesn't know that data can no longer be undefined in return method
  if ((isEmpty(data?.userPersonas) || !data) && !loading) {
    return <MySpotsWithoutSpots />;
  }

  const StyledCarousel = styled(Carousel)`
    && {
      .slick-track {
        margin: auto;
      }
    }
  `;

  return (
    <div>
      <LoginOrHamburger />
      <StyledPageWrapper>
        <Loader loading={loading || isSetDefaultPersonaLoading} data={data}>
          <PageWrapperSpaceBetween>
            {data?.userPersonas && renderCarousel(data?.userPersonas)}
            <ShareQrComponent qrCodeLink={data?.userPersonas[currentSlide]?.qrCodeLink} />
          </PageWrapperSpaceBetween>
          <NavLink to={APP_ROUTES.PERSONA_CREATION_STEP_1}>
            <CreatePersona>
              <img src={AddIcon} alt="Create Icon" />
            </CreatePersona>
          </NavLink>
        </Loader>
      </StyledPageWrapper>
    </div>
  );
};
