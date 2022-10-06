/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, ReactNode } from 'react';

import { IUser } from '../types/ITypes';
import { DiscoverContext } from './contexts';

interface Props {
  children: ReactNode;
}

function DiscoverProvider({ children }: Props) {
  const [discoverUsers, setDiscoverUsers] = useState<IUser[]>([]);
  const [followedUsers, setFollowedUsers] = useState<IUser[]>([]);

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

  const fetchFollowedUsers = () => {
    fetch('/message_followed_people')
      .then((res) => {
        if (res.ok) {
          res.json()
            .then((data) => {
              setFollowedUsers(data);
            });
        } else {
          setFollowedUsers([]);
        }
      });
  };

  return (
    <DiscoverContext.Provider
      value={{
        discoverUsers,
        fetchDiscoverUsers,
        followedUsers,
        fetchFollowedUsers,
      }}
    >
      {children}
    </DiscoverContext.Provider>
  );
}

export default DiscoverProvider;
