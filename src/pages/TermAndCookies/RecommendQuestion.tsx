import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Button } from 'components/Button/Button';
import RecommendQuestionImg from 'assets/RecommendQuestion.svg';
import useLocalStorage from 'react-use-localstorage';

const CookiesBarStyled = styled.div`
  display: flex;
  padding: 12px 20px;
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

const CookieText = styled.p`
  ${props => props.theme.typography.caption};
  color: ${props => props.theme.colors.utils.text.dark};
`;

const ButtonAccept = styled(Button)`
  width: 108px;
`;

const ButtonCancelLeft = styled(Button)`
  width: 108px;
  margin-right: 16px;
`;

const ButtonBox = styled.div``;

export const RecommendQuestion: FunctionComponent = () => {
  const [isRecommendQuestion, setIsRecommendQuestion] = useLocalStorage('isRecommendQuestion', 'true');

  if (isRecommendQuestion === 'false') {
    return null;
  }

  return (
    <CookiesBarStyled>
      <CloseSign onClick={() => setIsRecommendQuestion('false')}>x</CloseSign>
      <img alt="Recommend icon" src={RecommendQuestionImg} />
      <CookieText>
        <b>
          Are you sure you want to recommend
          <br /> this person / spot?
          <br />
        </b>
        Note, that you can recommend <br />
        up to <u>3 personas and 3 spots</u> and every <br /> recommendation lasts for <u>2 weeks.</u>
      </CookieText>
      <ButtonBox>
        <ButtonCancelLeft onClick={() => setIsRecommendQuestion('false')}>NO</ButtonCancelLeft>
        <ButtonAccept>YES</ButtonAccept>
      </ButtonBox>
    </CookiesBarStyled>
  );
};
