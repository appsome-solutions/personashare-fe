import React, { FC } from 'react';
import { Overlay } from '../Overlay/Overlay';
import { Spinner } from '../Spinner/Spinner';

type LoaderType = {
  loading: boolean;
  data: any;
};

export const Loader: FC<LoaderType> = ({ loading, data, children }) => {
  if (loading || !data) {
    return (
      <Overlay>
        <Spinner />
      </Overlay>
    );
  }
  return <>{children}</>;
};
