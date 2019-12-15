import React from 'react';
import { TopNav } from 'components/TopNav/TopNav';
import LogoSvg from 'assets/logo.svg';
import styled from 'styled-components';
import { Card } from 'components/Card/Card';

const StyledLogo = styled.img`
  margin-top: 46px;
  margin-bottom: 36px;
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 16px;
  background-color: ${props => props.theme.colors.utils.background.mid};
`;

const CreateAccountText = styled.h5`
  margin-bottom: 20px;
  color: ${props => props.theme.colors.utils.text.dark};
`;

const StyledCard = styled(Card)`
  display: flex;
  justify-content: center;
  padding-top: 27px;
  padding-bottom: 34px;
`;

export const Register = () => {
  return (
    <div>
      <TopNav isWithBackArrow />
      <PageWrapper>
        <StyledLogo src={LogoSvg} alt="logo" />
        <StyledCard>
          <CreateAccountText> Create Account </CreateAccountText>
        </StyledCard>
      </PageWrapper>
    </div>
  );
};
