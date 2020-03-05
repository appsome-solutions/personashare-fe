import React, { createContext, useContext, FC, useState, Dispatch, SetStateAction } from 'react';
import { gqlUser } from 'global/graphqls/schema';

interface UserContext {
  user: gqlUser | undefined;
  setUser: Dispatch<SetStateAction<gqlUser | undefined>>;
}

const UserContext = createContext<UserContext | undefined>(undefined);

const useUserContext = (): UserContext => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

const UserProvider: FC = ({ children }) => {
  const [user, setUser] = useState<gqlUser>();
  // add graphlql query for user?
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export { useUserContext, UserProvider };
