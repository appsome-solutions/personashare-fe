import React, { FC } from 'react';
import { useRWD } from '../RWD';
import DesktopPreview from 'pages/DesktopPreview/DesktopPreview';

export const ResponsiveContentReplacer: FC = ({ children }) => {
  const { width } = useRWD();
  {
    return width <= 767 || window.location.search.includes('verifyEmail') ? <>{children}</> : <DesktopPreview />;
  }
};
