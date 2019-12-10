import React from 'react';
import styled from 'styled-components';
import { Icon } from 'components/Icon';
import { Col } from 'antd';
import { Link } from 'react-router-dom';

type NavActive = {
  isActive: boolean;
};

const NavIcon = styled(Icon)<NavActive>`
  background-color: ${props =>
    props.isActive ? props.theme.colors.main.primary : props.theme.colors.functional.disabled};
`;

const CenteredCol = styled(Col)`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const NavText = styled.span.attrs({
  style: (props: any) => props.theme.typography.subtitle2,
})<NavActive>`
  color: ${props => (props.isActive ? props.theme.colors.main.primary : props.theme.colors.functional.disabled)};
  display: ${props => !props.isActive && 'none'};
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

type NavigationElementType = {
  svg: string;
  text: string;
  redirectionLink: string;
} & NavActive;

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
