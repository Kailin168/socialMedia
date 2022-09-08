/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, ReactNode } from 'react';

import { IUser } from '../types/ITypes';
import { DiscoverContext } from './contexts';

interface Props {
  children: ReactNode;
}

function DiscoverProvider({ children }: Props) {
  const [discoverUsers, setDiscoverUsers] = useState<IUser[]>([]);

  const fetchDiscoverUsers = () => {
    fetch('/discover_new_people')
      .then((res) => {
        if (res.ok) {
          res.json()
            .then((data) => {
              setDiscoverUsers(data);
            });
        } else {
          setDiscoverUsers([]);
        }
      });
  };

  return (
    <DiscoverContext.Provider
      value={{
        discoverUsers,
        fetchDiscoverUsers,
      }}
    >
      {children}
    </DiscoverContext.Provider>
  );
}

export default DiscoverProvider;
