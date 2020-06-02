/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState } from 'react';
import { Button } from 'components/Button';

type Props = {
  test?: string;
  type?: string;
  node?: any;
  ref?: any;
  readOnly?: any;
};

const ExampleComponent: FC<Props> = ({ test }) => {
  const [flag, setFlag] = useState(false);
  return (
    <div>
      DUPA:
      <Button onClick={() => setFlag((flag) => !flag)}>
        TEST {`${flag}`} {test}
      </Button>
    </div>
  );
};

export default ExampleComponent;
