import React, { FC } from 'react';
import { CreateCard } from 'components/CreateSpotAndPersona/CreateCard/CreateCard';

export const CreatePersonaCard: FC = () => {
  return (
    <div>
      <CreateCard pathSpotOrPersona="/createpersona/page"></CreateCard>
    </div>
  );
};
