import React, { FC } from 'react';
import { EntityCard as EntityType } from 'global/graphqls/schema';
import { CardBody } from 'components/CreateSpotAndPersona/CreateCard/CreateCard.styles';
import { BackgroundPlaceholder } from 'components/BackgroundPlaceholder/BackgroundPlaceholder';
import { Card } from 'components/Card/Card';
import { EditRemoveMenu } from 'components/PersonaCard/EditAndRemoveMenu';
import styled from 'styled-components';

type Props = {
  card: EntityType;
  uuid: string;
  isWithEdit?: boolean;
};

const CardStyled = styled(Card)`
  margin-top: 0px;
`;
const NameStyled = styled.div`
  margin: 40px 0 16px 0;
`;

const DescriptionStyled = styled.div`
  margin-bottom: 16px;
`;

export const SpotPage: FC<Props> = ({ card, uuid, isWithEdit }) => {
  return (
    <CardStyled mt={31} mb={40} position="relative">
      <BackgroundPlaceholder background={card.background} alt="Card background">
        {isWithEdit && <EditRemoveMenu uuid={uuid} />}
      </BackgroundPlaceholder>
      <CardBody>
        <NameStyled>{card.name}</NameStyled>
        <DescriptionStyled>{card.description}</DescriptionStyled>
      </CardBody>
    </CardStyled>
  );
};
