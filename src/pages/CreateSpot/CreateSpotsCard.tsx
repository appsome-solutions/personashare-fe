import React, { FC } from 'react';
import { CreateCard } from 'components/CreateSpotAndPersona/CreateCard/CreateCard';

export const CreateSpotsCard: FC = () => {
  return (
    <div>
      <CreateCard pathSpotOrPersona="/creation/step/3/entity/spot"></CreateCard>
    </div>
  );
};
