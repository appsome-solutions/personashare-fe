import React from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { Icon } from '../Icon';
import LeftArrowIcon from 'assets/left_arrow.svg';
import { useUserContext } from '../../global/UserContext/UserContext';
import { APP_ROUTES } from '../../global/AppRouter/routes';
import { useQuery } from '@apollo/react-hooks';
import { GET_PERSONA, GetCardType } from '../../global/graphqls/Persona';
import { PersonaCircle } from '../PersonaCircle/PersonaCircle';

type TopNavType = {
  isWithBackArrow?: boolean;
};

const StyledIcon = styled(Icon)`
  background-color: ${(props) => props.theme.colors.utils.background.light};
  margin-right: 6px;
`;

const NavWrapper = styled.div`
  padding: 12px 16px;
  height: 56px;
  background-color: ${(props) => props.theme.colors.main.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BackWrapper = styled.span`
  margin-left: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const BackText = styled.span`
  font-size: ${(props) => props.theme.typography.subtitle1.fontSize};
  font-weight: 600;
  letter-spacing: ${(props) => props.theme.typography.subtitle1.letterSpacing};
  color: ${(props) => props.theme.colors.utils.text.light};
`;

const RightProfile = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;
const CircleStyled = styled.div`
  position: absolute;
`;

const PersonaCircleStyle = styled(PersonaCircle)`
  width: 36px;
  height: 36px;
  border: none;
`;

//todo: remove all nav components and make them as single one (TopNav, HamburgerMenu, LoginOrHamburger)s
// and refactor user data to return defatulPersona as object instead of id
export const TopNav = ({ isWithBackArrow }: TopNavType) => {
  const history = useHistory();
  const { user } = useUserContext();
  const { loading: isPersonaLoading, data: personaData } = useQuery<GetCardType>(GET_PERSONA, {
    variables: { uuid: user?.defaultPersona },
  });

  if (isPersonaLoading) {
    return null;
  }

  return (
    <NavWrapper>
      {isWithBackArrow && (
        <BackWrapper onClick={() => history.goBack()}>
          <StyledIcon svgLink={LeftArrowIcon} />
          <BackText>BACK</BackText>
        </BackWrapper>
      )}
      {user && personaData && (
        <Link to={`${APP_ROUTES.MY_PERSONAS}`}>
          <RightProfile>
            <CircleStyled>
              <PersonaCircleStyle avatar={personaData.persona.card.avatar} alt="Avatar card" withFileInput={false} />
            </CircleStyled>
          </RightProfile>
        </Link>
      )}
    </NavWrapper>
  );
};
