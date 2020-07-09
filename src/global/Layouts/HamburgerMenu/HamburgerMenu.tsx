import React, { FC } from 'react';
import { Icon } from 'components/Icon/Icon';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import MySpots from 'assets/MySpots.svg';
import MyPersonas from 'assets/MyPersonas.svg';
import LogoutSvg from 'assets/Logout.svg';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { client, PS_TOKEN_NAME } from 'global/ApolloClient/ApolloClient';
import { SIGN_OUT, SignOutResponse } from 'global/graphqls/SignOut';
import { APP_ROUTES } from 'global/AppRouter/routes';
import { DrawerMenu } from 'components/Drawer/Drawer';
import { SearchPositionBox } from './SearchPositionBox';
import { PersonaCircle } from 'components/PersonaCircle/PersonaCircle';
import { EntityCard as EntityType } from 'global/graphqls/schema';
import { useUserContext } from '../../UserContext/UserContext';
import { useTranslation } from 'react-i18next';
import GuidingSpot from 'assets/GuidingSpot.svg';
import personaFamilyIcon from 'assets/personaFamilyIcon.svg';

type HamburgerMenuType = {
  isWithHamburger?: boolean;
  isWithSearch?: boolean;
  card: EntityType | null;
  uuid?: string;
  searchValue?: string;
  setSearchValue?: any;
};

const HamburgerMenuStyled = styled.div`
  padding: 12px 16px;
  height: 56px;
  background-color: ${(props) => props.theme.colors.main.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const HamburgerIcon = styled(Icon)`
  margin-left: 28px;
`;

const TextInHamburger = styled.div`
  margin-left: 16px;
  color: ${(props) => props.theme.colors.utils.text.dark};
  && {
    text-decoration: none;
  }
  ${(props) => props.theme.typography.subtitle2};
`;

const LinkRouterStyle = styled(NavLink)`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.main.primary};
  height: 50px;
  width: 100%;
  border-radius: 4px;
  text-decoration: none;
  :hover {
    background-color: rgba(85, 133, 255, 0.2);
  }
`;

const RightProfile = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

const LogoutButton = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.main.primary};
  height: 50px;
  width: 100%;
  border-radius: 4px;
  text-decoration: none;
  :hover {
    background-color: rgba(85, 133, 255, 0.2);
  }
`;

const CircleStyled = styled.div`
  position: absolute;
`;

const PersonaCircleStyle = styled(PersonaCircle)`
  width: 36px;
  height: 36px;
  border: none;
`;

const GuidingSpotStyled = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.main.primary};
  height: 50px;
  width: 100%;
  border-radius: 4px;
  text-decoration: none;
`;

const GuidingHrefStyle = styled.a`
  text-decoration: none;
`;

export const HamburgerMenu: FC<HamburgerMenuType> = ({
  isWithHamburger,
  isWithSearch,
  card,
  searchValue,
  setSearchValue,
}) => {
  const history = useHistory();
  const [logout] = useMutation<SignOutResponse>(SIGN_OUT);
  const { t } = useTranslation();
  const { setUser } = useUserContext();

  return (
    <>
      {isWithHamburger && (
        <HamburgerMenuStyled>
          <DrawerMenu>
            <LinkRouterStyle to={APP_ROUTES.MY_PERSONAS}>
              <HamburgerIcon svgLink={MyPersonas} />
              <TextInHamburger>{t('MENU_REDIRECT_MY_PERSONA')}</TextInHamburger>
            </LinkRouterStyle>
            <LinkRouterStyle to={APP_ROUTES.MY_SPOTS}>
              <HamburgerIcon svgLink={MySpots} />
              <TextInHamburger>{t('MENU_REDIRECT_MY_SPOT')}</TextInHamburger>
            </LinkRouterStyle>
            <GuidingHrefStyle href="https://www.personashare.com/spot/25b235bd-98db-4353-93f0-53fb091fc72a">
              <GuidingSpotStyled>
                <HamburgerIcon svgLink={GuidingSpot} />
                <TextInHamburger>{t('GUIDING_SPOT')}</TextInHamburger>
              </GuidingSpotStyled>
            </GuidingHrefStyle>{' '}
            <LinkRouterStyle to={APP_ROUTES.PERSONA_FAMILY}>
              <HamburgerIcon svgLink={personaFamilyIcon} />
              <TextInHamburger>{t('PERSONA_FAMILY')}</TextInHamburger>
            </LinkRouterStyle>
            <LogoutButton
              onClick={async () => {
                await logout();
                localStorage.removeItem(PS_TOKEN_NAME);
                history.push(`.${APP_ROUTES.LOGIN}`);
                client.resetStore();
                setUser(null);
              }}
            >
              <HamburgerIcon svgLink={LogoutSvg} />
              <TextInHamburger>{t('MENU_REDIRECT_LOGOUT')}</TextInHamburger>
            </LogoutButton>
          </DrawerMenu>
          {isWithSearch && <SearchPositionBox searchValue={searchValue} setSearchValue={setSearchValue} />}
          <Link to={`${APP_ROUTES.MY_PERSONAS}`}>
            <RightProfile>
              <CircleStyled>
                <PersonaCircleStyle avatar={card?.avatar} alt="Avatar card" withFileInput={false} />
              </CircleStyled>
            </RightProfile>
          </Link>
        </HamburgerMenuStyled>
      )}
    </>
  );
};
