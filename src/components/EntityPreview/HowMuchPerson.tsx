import React, { FC } from 'react';
import styled from 'styled-components';

export interface PropsType {
  gridCardValue: any;
  savedOrRecommend?: string;
  spotsOrPersonsText?: string;
}

const HowManyUsers = styled.div`
  ${(props) => props.theme.typography.body1}
`;

export const HowMuchPerson: FC<PropsType> = ({ gridCardValue, savedOrRecommend, spotsOrPersonsText }) => {
  const CheckHowMuchPerson = () => {
    if (!gridCardValue) {
      return (
        <HowManyUsers>
          0 {spotsOrPersonsText} {savedOrRecommend} your profile
        </HowManyUsers>
      );
    } else {
      return (
        <HowManyUsers>
          {gridCardValue.length} {spotsOrPersonsText} {savedOrRecommend} your profile
        </HowManyUsers>
      );
    }
  };

  return <CheckHowMuchPerson />;
};
