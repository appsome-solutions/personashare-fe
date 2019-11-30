import React, { FunctionComponent } from 'react';
import QrScanner from '../../global/Components/QrScanner/QrScanner';

export const Home: FunctionComponent = () => {
  return (
    <div>
      <QrScanner onCode={res => alert(res.data)} />
    </div>
  );
};
