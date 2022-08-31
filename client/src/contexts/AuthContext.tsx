/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, ReactNode } from 'react';

import { AuthContext } from './contexts';

interface Props {
  children: ReactNode;
}

function AuthProvider({ children }: Props) {
  const [user, setUser] = useState({});

  const isLoggedIn = Object.keys(user).length !== 0;

  const handleLogout = () => {
    // fetch('/logout', { method: 'DELETE' });
    setUser({});
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
