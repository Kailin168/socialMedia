import { createContext, Dispatch, SetStateAction } from 'react';

const setStateObjectFunc: Dispatch<SetStateAction<Record<string, unknown>>> = () => {};

export const AuthContext = createContext({
  user: {},
  setUser: setStateObjectFunc,
  handleLogout: () => {},
  isLoggedIn: false,
});
