/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from './contexts';

interface Props {
  children: ReactNode;
}

function AuthProvider({ children }: Props) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const isLoggedIn = Object.keys(user).length !== 0;

  const handleLogout = () => {
    fetch('/logout', { method: 'DELETE' });
    setUser({});
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        handleLogout,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
