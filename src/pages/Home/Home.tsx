import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

export const Home = () => {
  useEffect(() => {});
  return <Redirect to="/scanner" />;
};
