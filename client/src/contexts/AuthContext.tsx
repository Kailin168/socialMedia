/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { IUser, EmptyUserValue } from '../types/ITypes';
import { AuthContext } from './contexts';

interface Props {
  children: ReactNode;
}

function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<IUser>(EmptyUserValue);
  const navigate = useNavigate();

  const isLoggedInFromCookie = (Cookies.get('isLoggedIn') || '') === 'true';
  const isLoggedIn = isLoggedInFromCookie || (user.id !== -1 && user.username.length > 0);

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

  const fetchUser = () => {
    fetch('/me')
      .then((res) => {
        if (res.ok) {
          res.json()
            .then((data) => {
              handleLogin(data);
            // navigate('/home');
            });
        } else if (res.status !== 500 && res.status !== 404) {
          handleLogout();
        }
      });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        handleLogin,
        handleLogout,
        isLoggedIn,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
