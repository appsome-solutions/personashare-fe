import React from 'react';
import { TopNav } from 'components/TopNav/TopNav';
import LogoSvg from 'assets/logo.svg';
import styled from 'styled-components';

const StyledLogo = styled.img`
  margin-top: 46px;
  margin-bottom: 36px;
`;

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${props => props.theme.colors.utils.background.mid};
`;

export const Register = () => {
  return (
    <div>
      <TopNav isWithBackArrow />
      <PageWrapper>
        <StyledLogo src={LogoSvg} alt="logo" />
      </PageWrapper>
    </div>
  );
};
