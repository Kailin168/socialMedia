import { createContext } from 'react';
import { EmptyUserValue } from '../types/ITypes';
// const setStateObjectFunc: Dispatch<SetStateAction<Record<string, unknown>>> = () => {};

export const AuthContext = createContext({
  user: EmptyUserValue,
  handleLogout: () => {},
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  handleLogin: (user: any) => {},
  isLoggedIn: false,
});
