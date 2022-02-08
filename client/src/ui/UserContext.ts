import { createContext, useContext } from 'react';

export const UserContext = createContext<{ reloadUsers: () => Promise<void> }>(
  undefined!
);
export const useUserContext = () => useContext(UserContext);
