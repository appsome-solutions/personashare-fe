import React from 'react';
import styled from 'styled-components';
import { Col } from 'antd';
import { Link } from 'react-router-dom';
import { CoreThemePropsType } from 'global/Themes/CoreTheme';

type NavActive = {
  isActive: boolean;
};

type NavigationElementType = {
  text: string;
  redirectionLink: string;
} & NavActive;

const CenteredCol = styled(Col).attrs({
  style: (props: CoreThemePropsType) => props.theme.typography.subtitle2,
})<NavActive>`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 52px;
  }
  border-bottom: ${(props) => props.isActive && '2px solid white'};
`;

const NavText = styled.div`
  ${(props) => props.theme.typography.subtitle2};
  color: ${(props) => props.theme.colors.utils.background.light};
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const NavigationElementStats = ({ text, redirectionLink, isActive }: NavigationElementType) => {
  return (
    <CenteredCol isActive={isActive} span={8}>
      <StyledLink to={redirectionLink}>
        <NavText>{text}</NavText>
      </StyledLink>
    </CenteredCol>
  );
};
