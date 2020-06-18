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
`;

const DescriptionStyled = styled.div`
  margin-bottom: 16px;
`;

const StyledCard = styled(Card)`
  width: 262px;
`;

export const PersonaCard: FC<Props> = ({ card, uuid, isWithEdit, onClick, isDefaultPersona }) => {
  return (
    <StyledCard mt={31} mb={40} position="relative" onClick={onClick} className="PersonaCardMain">
      <BackgroundPlaceholder background={card.background} alt="Card background">
        <PersonaCircleWrapper>
          <PersonaCircle avatar={card.avatar} alt="Avatar card" />
        </PersonaCircleWrapper>
        {isWithEdit && <EditRemoveMenu uuid={uuid} isDefaultPersona={isDefaultPersona} />}
      </BackgroundPlaceholder>
      <CardBody>
        <NameStyled>{card.name}</NameStyled>
        <DescriptionStyled>{card.description}</DescriptionStyled>
      </CardBody>
    </StyledCard>
  );
};
