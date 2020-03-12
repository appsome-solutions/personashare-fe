import React, { FC, useState, Dispatch, SetStateAction, useEffect } from 'react';
import { gqlUser, gqlUserResponse } from 'global/graphqls/schema';
import { GET_USER } from 'global/graphqls/User';
import { useQuery } from '@apollo/react-hooks';
import { createCtx } from 'helpers/Context';

interface UserContext {
  user: gqlUser | null;
  setUser: Dispatch<SetStateAction<gqlUser | null>>;
}

const [useUserContext, UserContext] = createCtx<UserContext>();

const UserProvider: FC = ({ children }) => {
  const [user, setUser] = useState<gqlUser | null>(null);
  const { data } = useQuery<gqlUserResponse>(GET_USER, {
    variables: { condition: { uuid: localStorage.getItem('USER_UUID') } },
  });
  useEffect(() => {
    if (data) {
      setUser(data.user);
    }
  }, [data]);
  return <UserContext value={{ user, setUser }}>{children}</UserContext>;
};

export { useUserContext, UserProvider };
