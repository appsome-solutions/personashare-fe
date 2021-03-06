import React, { FC } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { APP_ROUTES } from 'global/AppRouter/routes';
import { TopNav } from 'components/TopNav/TopNav';
import BoxInSpots from 'assets/BoxInSpots.svg';
import AddIcon from 'assets/AddIcon.svg';
import { useTranslation } from 'react-i18next';
import { StickyNavigation } from '../../global/Layouts/StickyNavigation/StickyNavigation';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 32px;
  width: auto;

  height: ${(props) => props.theme.contentHeight};
  overflow: auto;
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

export const MySpotsWithoutSpots: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <TopNav isWithBackArrow />
      <Wrapper>
        <TextAndImg>
          <img src={BoxInSpots} alt="Box In Spots" />
          <TextUnderImg>{t('NO_SPOTS_CREATED')}</TextUnderImg>
        </TextAndImg>
        <NavLink to={APP_ROUTES.SPOT_CREATION_STEP_1}>
          <CreateSpot>
            <img src={AddIcon} alt="Create Icon" />
          </CreateSpot>
        </NavLink>
      </Wrapper>
      <StickyNavigation />
    </>
  );
};
