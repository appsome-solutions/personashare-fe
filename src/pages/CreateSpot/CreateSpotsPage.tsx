import React, { FC } from 'react';
import { CreatePage } from 'components/CreateSpotAndPersona/CreatePage/CreatePage';

export const CreateSpotsPage: FC = () => {
  return (
    <div>
      <CreatePage
        nextStepPath="/my-spots"
        nameSpotOrPersona="Spot"
        previousStepPath="/creation/step/2/entity/spot"
      ></CreatePage>
    </div>
  );
};
