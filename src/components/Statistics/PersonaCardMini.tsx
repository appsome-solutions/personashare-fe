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
  padding: 36px 12px 4px 12px;
  width: 100%;
  text-align: center;
`;

const DescriptionStyled = styled.div`
  padding: 4px 12px 4px 12px;
  width: 100%;
  text-align: center;
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

const TextStyled = styled.p`
  word-wrap: break-word;
  text-align: center;
`;

export const PersonaCardMini: FC<Props> = ({ card, onClick }) => {
  const isLongDescription = card.description.length > 30;
  const isLongName = card.name.length > 30;

  return (
    <StyledCard mt={31} mb={40} position="relative" onClick={onClick}>
      <BackgroundPlaceholderMini background={card.background} alt="Card background">
        <PersonaCircleWrapperStyled>
          <PersonaCircleStyled avatar={card.avatar} alt="Avatar card" />
        </PersonaCircleWrapperStyled>
      </BackgroundPlaceholderMini>
      <CardBodyStyled>
        <NameStyled>
          <TextStyled>{isLongName ? `${card.name.slice(0, 30)}` : card.name}</TextStyled>
        </NameStyled>
        <DescriptionStyled>
          <TextStyled>{isLongDescription ? `${card.description.slice(0, 30)}` : card.description}</TextStyled>{' '}
        </DescriptionStyled>
      </CardBodyStyled>
    </StyledCard>
  );
};
