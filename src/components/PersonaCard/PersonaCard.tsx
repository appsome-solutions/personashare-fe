import React, { FC } from 'react';
import { PersonaCard as PersonaCardType } from 'global/graphqls/schema';

import { CardBody } from 'pages/CreatePersona/CreateCard/CreateCard.styles';
import { BackgroundPlaceholder } from 'components/BackgroundPlaceholder/BackgroundPlaceholder';
import { PersonaCircle, PersonaCircleWrapper } from 'components/PersonaCircle/PersonaCircle';
import { Card } from 'components/Card/Card';

type Props = {
  card: PersonaCardType;
};

export const PersonaCard: FC<Props> = ({ card }) => (
  <Card mt={31} mb={40} position="relative">
    <BackgroundPlaceholder background={card.background} alt="Card background">
      <PersonaCircleWrapper>
        <PersonaCircle avatar={card.avatar} alt="Avatar card" onAvatarSet={() => {}} />
      </PersonaCircleWrapper>
    </BackgroundPlaceholder>
    <CardBody>
      <div>{card.name}</div>
      <div>{card.description}</div>
    </CardBody>
  </Card>
);
