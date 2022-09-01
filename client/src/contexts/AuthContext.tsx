/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { IUser, EmptyUserValue } from '../types/IUser';
import { AuthContext } from './contexts';

interface Props {
  children: ReactNode;
}

function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<IUser>(EmptyUserValue);
  const navigate = useNavigate();

  const isLoggedInFromCookie = (Cookies.get('isLoggedIn') || '') === 'true';
  const isLoggedIn = isLoggedInFromCookie || (user.id !== -1 && user.username.length > 0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLogin = (userFromServer: IUser) => {
    setUser(userFromServer);
    Cookies.set('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    fetch('/logout', { method: 'DELETE' });
    setUser(EmptyUserValue);
    navigate('/login');
    Cookies.remove('isLoggedIn');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        handleLogin,
        handleLogout,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
