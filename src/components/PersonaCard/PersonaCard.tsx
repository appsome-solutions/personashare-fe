import React, { FC } from 'react';
import { EntityCard as EntityType } from 'global/graphqls/schema';

import { CardBody } from 'components/CreateSpotAndPersona/CreateCard/CreateCard.styles';
import { BackgroundPlaceholder } from 'components/BackgroundPlaceholder/BackgroundPlaceholder';
import { PersonaCircle, PersonaCircleWrapper } from 'components/PersonaCircle/PersonaCircle';
import { Card } from 'components/Card/Card';

type Props = {
  card: EntityType;
};

export const PersonaCard: FC<Props> = ({ card }) => (
  <Card mt={31} mb={40} position="relative">
    <BackgroundPlaceholder background={card.background} alt="Card background">
      <PersonaCircleWrapper>
        <PersonaCircle avatar={card.avatar} alt="Avatar card" />
      </PersonaCircleWrapper>
    </BackgroundPlaceholder>
    <CardBody>
      <div>{card.name}</div>
      <div>{card.description}</div>
    </CardBody>
  </Card>
);
