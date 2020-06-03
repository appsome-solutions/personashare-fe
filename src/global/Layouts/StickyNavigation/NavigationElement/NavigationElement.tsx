import React from 'react';
import styled from 'styled-components';
import { Icon } from 'components/Icon';
import { Col } from 'antd';
import { Link } from 'react-router-dom';
import { CoreThemePropsType } from 'global/Themes/CoreTheme';

type NavActive = {
  isActive: boolean;
};

type NavigationElementType = {
  svg: string;
  text: string;
  redirectionLink: string;
} & NavActive;

const getActiveColor = (props: NavActive & CoreThemePropsType) =>
  props.isActive ? props.theme.colors.main.primary : props.theme.colors.functional.disabled;

const NavIcon = styled(Icon)<NavActive>`
  background-color: ${(props) => getActiveColor(props)};
`;

const CenteredCol = styled(Col)`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 52px;
  }
`;

const NavText = styled.span.attrs({
  style: (props: CoreThemePropsType) => props.theme.typography.subtitle2,
})<NavActive>`
  color: ${(props) => getActiveColor(props)};
  display: ${(props) => !props.isActive && 'none'};
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const NavigationElement = ({ isActive, svg, text, redirectionLink }: NavigationElementType) => {
  return (
    <CenteredCol span={8}>
      <StyledLink to={redirectionLink}>
        <NavIcon svgLink={svg} isActive={isActive} />
        <NavText isActive={isActive}>{text}</NavText>
      </StyledLink>
    </CenteredCol>
  );
};
