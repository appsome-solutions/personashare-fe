import React, { FC, useState, Dispatch, SetStateAction, useEffect } from 'react';
import { gqlUser } from 'global/graphqls/schema';
import { GET_USER } from 'global/graphqls/User';
import { useQuery } from '@apollo/react-hooks';
import { createCtx } from 'helpers/Context';
// import { Spinner } from 'components/Spinner/Spinner';

interface UserContext {
  user: gqlUser | null;
  setUser: Dispatch<SetStateAction<gqlUser | null>>;
}

const [useUserContext, UserContext] = createCtx<UserContext>();

const UserProvider: FC = ({ children }) => {
  const { data } = useQuery<{ user: gqlUser }>(GET_USER);
  const [user, setUser] = useState<gqlUser | null>(null);
  useEffect(() => {
    if (data) {
      setUser(data.user);
    }
  }, [data]);

  // for the first render after login user is not yet set, so we are taking data.user as a value
  return <UserContext value={{ user: (user || data?.user) ?? null, setUser }}>{children}</UserContext>;
};

export { useUserContext, UserProvider };
