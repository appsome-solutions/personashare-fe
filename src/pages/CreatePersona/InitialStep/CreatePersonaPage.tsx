import React, { FC } from 'react';
import { CreatePage } from 'components/CreateSpotAndPersona/CreatePage/CreatePage';

export const CreatePersonaPage: FC = () => {
  return (
    <div>
      <CreatePage
        nextStepPath="/personas"
        nameSpotOrPersona="Persona"
        previousStepPath="/createpersona/card"
      ></CreatePage>
    </div>
  );
};
