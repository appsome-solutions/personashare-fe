import React, { FC } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { APP_ROUTES } from 'global/AppRouter/routes';
import { TopNav } from 'components/TopNav/TopNav';
import BoxInSpots from 'assets/BoxInSpots.svg';
import AddIcon from 'assets/AddIcon.svg';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 32px;
  width: auto;
  height: 100vh;
`;

const TextAndImg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextUnderImg = styled.h5`
  opacity: 0.5;
`;

const CreateSpot = styled.div`
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

export const MyPersonaWithoutSpots: FC = () => {
  return (
    <>
      <TopNav isWithBackArrow />
      <Wrapper>
        <TextAndImg>
          <img src={BoxInSpots} alt="Box In Persona" />
          <TextUnderImg>no persona created</TextUnderImg>
        </TextAndImg>
        <NavLink to={`.${APP_ROUTES.PERSONA_CREATION_STEP_1}`}>
          <CreateSpot>
            <img src={AddIcon} alt="Create Icon" />
          </CreateSpot>
        </NavLink>
      </Wrapper>
    </>
  );
};
