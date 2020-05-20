import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import Diamond from 'assets/Diamond.svg';
import useLocalStorage from 'react-use-localstorage';
import FbIcon from 'assets/FbIcon.svg';
import LinkIn from 'assets/LinkIn.svg';

const InfoNotificationStyled = styled.div`
  display: flex;
  padding: 21px;
  flex-direction: column;
  background-color: ${props => props.theme.colors.utils.background.light};
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  position: sticky;
  text-align: center;
  bottom: 0px;
`;

const CloseSign = styled.div`
  text-align: right;
`;

const Text = styled.p`
  font-size: 10px;
  color: ${props => props.theme.colors.utils.text.dark};
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const LinkedInBox = styled.div`
  margin-right: 20px;
`;

export const InfoNotification: FunctionComponent = () => {
  const [isRecommendQuestion, setIsRecommendQuestion] = useLocalStorage('isRecommendQuestion', 'true');

  if (isRecommendQuestion === 'false') {
    return null;
  }

  return (
    <InfoNotificationStyled>
      <CloseSign onClick={() => setIsRecommendQuestion('false')}>x</CloseSign>
      <img alt="Diamond icon" src={Diamond} />
      <Text>
        Did you know, that you can be able to have real impact on <br />
        PersonaShare funcionalities? Follow us and be the part of
        <br />
        <b> #PersonaShareFamily</b>
      </Text>
      <IconBox>
        <LinkedInBox>
          <a href="https://www.linkedin.com/groups/8868704/?fbclid=IwAR1ET4HY6Tx14BCHpwz0Con4mopJV5UScAK9Gt26eZ8SKkQu3XSGvDdDh28">
            <img alt="LinkedIn icon" src={LinkIn} />
          </a>
        </LinkedInBox>
        <a href="https://www.facebook.com/PersonaShare-110785183877737">
          <img alt="Facebook icon" src={FbIcon} />
        </a>
      </IconBox>
    </InfoNotificationStyled>
  );
};
