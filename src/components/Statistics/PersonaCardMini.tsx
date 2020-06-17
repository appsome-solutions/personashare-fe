import React, { FC } from 'react';
import { EntityCard as EntityType } from 'global/graphqls/schema';
import { CardBody } from 'components/CreateSpotAndPersona/CreateCard/CreateCard.styles';
import { Card } from 'components/Card/Card';
import { PersonaCircle, PersonaCircleWrapper } from 'components/PersonaCircle/PersonaCircle';
import styled from 'styled-components';
import { BackgroundPlaceholderMini } from './BackgroundPlaceholderMini';

type Props = {
  card: EntityType;
  uuid: string;
  isWithEdit?: boolean;
  onClick?: any;
};

const NameStyled = styled.div`
  margin: 24px 0 16px 0;
`;

const DescriptionStyled = styled.div`
  margin-bottom: 16px;
`;

const StyledCard = styled(Card)`
  && {
    width: 154px;
    height: 186px;
    margin: 20px 0;
  }
`;

const PersonaCircleWrapperStyled = styled(PersonaCircleWrapper)`
  && {
    height: 54px;
  }
`;

const CardBodyStyled = styled(CardBody)`
  && {
    height: 112px;
  }
`;

const PersonaCircleStyled = styled(PersonaCircle)`
  && {
    height: 52px;
    width: 52px;
  }
`;

export const PersonaCardMini: FC<Props> = ({ card, onClick }) => {
  return (
    <StyledCard mt={31} mb={40} position="relative" onClick={onClick}>
      <BackgroundPlaceholderMini background={card.background} alt="Card background">
        <PersonaCircleWrapperStyled>
          <PersonaCircleStyled avatar={card.avatar} alt="Avatar card" />
        </PersonaCircleWrapperStyled>
      </BackgroundPlaceholderMini>
      <CardBodyStyled>
        <NameStyled>{card.name}</NameStyled>
        <DescriptionStyled>{card.description}</DescriptionStyled>
      </CardBodyStyled>
    </StyledCard>
  );
};
