import React, { FC, useState, Dispatch, SetStateAction, useEffect } from 'react';
import { gqlUser } from 'global/graphqls/schema';
import { GET_USER } from 'global/graphqls/User';
import { useQuery } from '@apollo/react-hooks';
import { createCtx } from 'helpers/Context';
import { Spinner } from 'components/Spinner/Spinner';
import { client, PS_TOKEN_NAME } from 'global/ApolloClient/ApolloClient';
import { useFirebase } from '../Firebase';
import jwtDecode from 'jwt-decode';

interface UserContext {
  user: gqlUser | null;
  setUser: Dispatch<SetStateAction<gqlUser | null>>;
}

const [useUserContext, UserContext] = createCtx<UserContext>();

const shouldSkip = () => {
  if (!localStorage.getItem(PS_TOKEN_NAME)) {
    return true;
  }
  try {
    const decodedToken = jwtDecode(localStorage.getItem(PS_TOKEN_NAME) as string) as any;
    // isTokenExpired:
    return Date.now() >= decodedToken.exp * 1000;
  } catch (error) {
    // token is invalid
    return true;
  }
};

const UserProvider: FC = ({ children }) => {
  const { data, loading } = useQuery<{ user: gqlUser }>(GET_USER, { skip: shouldSkip() });
  const [user, setUser] = useState<gqlUser | null>(null);
  const { onIdTokenChanged } = useFirebase();

  useEffect(() => {
    if (data) {
      setUser(data.user);
    }
    if (shouldSkip()) {
      setUser(null);
      client.resetStore();
    }
  }, [data]);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken(true);
        localStorage.setItem(PS_TOKEN_NAME, token);
      } else {
        console.error('REMOVED TOKEN');
        localStorage.removeItem(PS_TOKEN_NAME);
      }
    });

    return () => unsubscribe();
  });

  if (loading) {
    return <Spinner />;
  }

  // for the first render after login user is not yet set, so we are taking data.user as a value
  return <UserContext value={{ user: user || data?.user || null, setUser }}>{children}</UserContext>;
};

export { useUserContext, UserProvider };
