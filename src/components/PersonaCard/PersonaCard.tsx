import React, { FC } from 'react';
import { EntityCard as EntityType } from 'global/graphqls/schema';
import { CardBody } from 'components/CreateSpotAndPersona/CreateCard/CreateCard.styles';
import { BackgroundPlaceholder } from 'components/BackgroundPlaceholder/BackgroundPlaceholder';
import { Card } from 'components/Card/Card';
import { EditRemoveMenu } from './EditAndRemoveMenu';
import { PersonaCircle, PersonaCircleWrapper } from 'components/PersonaCircle/PersonaCircle';
import styled from 'styled-components';

type Props = {
  card: EntityType;
  uuid: string;
  isWithEdit?: boolean;
  onClick?: any;
  isDefaultPersona?: boolean;
};

const NameStyled = styled.div`
  margin: 40px 0 16px 0;
  padding-left: 12px;
  padding-right: 12px;
  width: 100%;
  text-align: center;
`;

const TextStyled = styled.p`
  word-wrap: break-word;
  text-align: center;
`;

const DescriptionStyled = styled.div`
  margin-bottom: 16px;
  text-align: center;
  width: 100%;
  padding-left: 12px;
  padding-right: 12px;
`;

const StyledCard = styled(Card)`
  width: 262px;
`;

export const PersonaCard: FC<Props> = ({ card, uuid, isWithEdit, onClick, isDefaultPersona }) => {
  const isLongDescription = card.description.length > 69;
  const isLongName = card.name.length > 69;

  return (
    <StyledCard mt={31} mb={40} position="relative" onClick={onClick} className="PersonaCardMain">
      <BackgroundPlaceholder background={card.background} alt="Card background">
        <PersonaCircleWrapper>
          <PersonaCircle avatar={card.avatar} alt="Avatar card" />
        </PersonaCircleWrapper>
        {isWithEdit && <EditRemoveMenu uuid={uuid} isDefaultPersona={isDefaultPersona} />}
      </BackgroundPlaceholder>
      <CardBody>
        <NameStyled>
          <TextStyled>{isLongName ? `${card.name.slice(0, 69)}` : card.name}</TextStyled>
        </NameStyled>
        <DescriptionStyled>
          <TextStyled> {isLongDescription ? `${card.description.slice(0, 69)}` : card.description}</TextStyled>
        </DescriptionStyled>
      </CardBody>
    </StyledCard>
  );
};
