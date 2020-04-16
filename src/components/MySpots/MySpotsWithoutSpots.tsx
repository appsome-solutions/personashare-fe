import React from 'react';
import styled from 'styled-components';
import { HamburgerMenu } from 'global/Layouts/HamburgerMenu/HamburgerMenu';
import { TopNav } from '../TopNav/TopNav';
import BoxInSpots from 'assets/BoxInSpots.svg';
import AddIcon from 'assets/AddIcon.svg';
import { NavLink } from 'react-router-dom';

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
  background-color: ${props => props.theme.colors.main.primary};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MySpotsWithoutSpots = () => {
  return (
    <>
      <TopNav isWithBackArrow />
      <HamburgerMenu isWithHamburger={false} />
      <Wrapper>
        <TextAndImg>
          <img src={BoxInSpots} alt="Box In Spots" />
          <TextUnderImg>no spots created</TextUnderImg>
        </TextAndImg>
        <NavLink to="./creation/step/1/entity/spot">
          <CreateSpot>
            <img src={AddIcon} alt="Create Icon" />
          </CreateSpot>
        </NavLink>
      </Wrapper>
    </>
  );
};
