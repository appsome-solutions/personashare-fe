import React from 'react';
import { TopNav } from 'components/TopNav/TopNav';
import LogoSvg from 'assets/logo.svg';
import styled from 'styled-components';
import { Card } from 'components/Card/Card';
import { EmailInput } from 'components/EmailInput/EmailInput';
import { Checkbox } from 'components/Checkbox';
import { Link } from 'react-router-dom';
import { Button } from 'components/Button';
import { PasswordInput } from 'components/PasswordInput';
import { PageWrapper } from 'components/PageWrapper/PageWrapper';

const StyledLogo = styled.img`
  margin-top: 46px;
  margin-bottom: 36px;
`;

const CreateAccountText = styled.h5`
  margin-bottom: 20px;
  color: ${props => props.theme.colors.utils.text.dark};
`;

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 27px 24px 34px;
`;

const Caption = styled.span(props => props.theme.typography.caption);

const StyledCheckbox = styled(Checkbox)`
  align-self: start;
  margin-top: 24px;
`;

const RegisterButton = styled(Button)`
  margin-top: 28px;
`;

// Specific color for this specific button:
const GoogleButton = styled(Button)`
  && {
    background-color: #e62b33;
    &&:active,
    &&:hover {
      color: ${props => props.theme.colors.utils.text.light};
      background-color: #e62b33;
    }
  }
`;

const OrRegisterCaption = styled(Caption)`
  margin: 18px 0;
`;

const LogInCaption = styled(Caption)`
  text-align: center;
  margin-top: 32px;
  margin-bottom: 24px;
`;

const StyledPasswordInput = styled(PasswordInput)`
  margin-top: 20px;
`;

export const Register = () => {
  return (
    <div>
      <TopNav isWithBackArrow />
      <PageWrapper>
        <StyledLogo src={LogoSvg} alt="logo" />
        <StyledCard>
          <CreateAccountText> Create Account </CreateAccountText>
          <EmailInput placeholder="Email" />
          <StyledPasswordInput placeholder="Password" />
          <StyledPasswordInput placeholder="Repeat password" />
          <StyledCheckbox>
            <Caption>
              I read and agree to <Link to="/terms-and-conditions">Terms & Conditions</Link>
            </Caption>
          </StyledCheckbox>
          <RegisterButton block>REGISTER NOW</RegisterButton>
          <OrRegisterCaption>Or Register using social Media</OrRegisterCaption>
          <GoogleButton block>GOOGLE</GoogleButton>
        </StyledCard>
        <LogInCaption>
          Already have an account? <Link to="/login">Login</Link>
        </LogInCaption>
      </PageWrapper>
    </div>
  );
};
