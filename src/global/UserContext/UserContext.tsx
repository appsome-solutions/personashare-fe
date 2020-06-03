import React, { FC, useState, Dispatch, SetStateAction, useEffect } from 'react';
import { gqlUser } from 'global/graphqls/schema';
import { GET_USER } from 'global/graphqls/User';
import { useQuery } from '@apollo/react-hooks';
import { createCtx } from 'helpers/Context';
import { Spinner } from 'components/Spinner/Spinner';
import { PS_TOKEN_NAME } from 'global/ApolloClient/ApolloClient';
import { useFirebase } from '../Firebase';

interface UserContext {
  user: gqlUser | null;
  setUser: Dispatch<SetStateAction<gqlUser | null>>;
}

const [useUserContext, UserContext] = createCtx<UserContext>();

const UserProvider: FC = ({ children }) => {
  const { data, loading } = useQuery<{ user: gqlUser }>(GET_USER, { skip: !localStorage.getItem(PS_TOKEN_NAME) });
  const [user, setUser] = useState<gqlUser | null>(null);
  const { onAuthStateChanged } = useFirebase();

  useEffect(() => {
    if (data) {
      setUser(data.user);
    }
  }, [data]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken(true);
        localStorage.setItem(PS_TOKEN_NAME, token);
      } else {
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
