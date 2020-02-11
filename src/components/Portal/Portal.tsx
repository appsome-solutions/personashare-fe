import { ReactPortal, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { usePortal } from './usePortal';

type PortalProps = {
  id: string;
  children: ReactNode;
};

export const Portal = ({ id, children }: PortalProps): ReactPortal => {
  const target = usePortal(id);
  return createPortal(children, target);
};
