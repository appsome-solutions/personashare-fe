import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Icon } from '../Icon';
import LeftArrowIcon from 'assets/left_arrow.svg';

type TopNavType = {
  isWithBackArrow?: boolean;
};

const StyledIcon = styled(Icon)`
  background-color: ${props => props.theme.colors.utils.background.light};
  margin-right: 6px;
`;

const NavWrapper = styled.div`
  height: 56px;
  background-color: ${props => props.theme.colors.main.primary};
  display: flex;
`;

const BackWrapper = styled.span`
  margin-left: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const BackText = styled.span`
  font-size: ${props => props.theme.typography.subtitle1.fontSize};
  font-weight: 600;
  letter-spacing: ${props => props.theme.typography.subtitle1.letterSpacing};
  color: ${props => props.theme.colors.utils.text.light};
`;

export const TopNav = ({ isWithBackArrow }: TopNavType) => {
  const history = useHistory();

  return (
    <NavWrapper>
      {isWithBackArrow && (
        <BackWrapper onClick={() => history.goBack()}>
          <StyledIcon svgLink={LeftArrowIcon} />
          <BackText>BACK</BackText>
        </BackWrapper>
      )}
    </NavWrapper>
  );
};
