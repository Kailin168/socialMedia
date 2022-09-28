import { createContext } from 'react';
import actionCable from 'actioncable';
import { EmptyUserValue, IUser } from '../types/ITypes';
// const setStateObjectFunc: Dispatch<SetStateAction<Record<string, unknown>>> = () => {};

export const AuthContext = createContext({
  user: EmptyUserValue,
  fetchUser: () => {},
  handleLogout: () => {},
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  handleLogin: (user: any) => {},
  isLoggedIn: false,
});

export const DiscoverContext = createContext({
  discoverUsers: [] as IUser[],
  fetchDiscoverUsers: () => {},
});

export const ActionCableContext = createContext<{
  cable: actionCable.Cable;
}>({ cable: actionCable.createConsumer('') });
