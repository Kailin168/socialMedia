import React, {
  useEffect, useContext,
} from 'react';

import { Link } from 'react-router-dom';

import { DiscoverContext } from '../contexts/contexts';

export default function Rightsidebar() {
  const { discoverUsers, fetchDiscoverUsers } = useContext(DiscoverContext);

  useEffect(() => {
    fetchDiscoverUsers();
  }, []);

  return (
    <div>
      {discoverUsers.length === 0 ? <span>Nothing to Discover</span> : discoverUsers.map((user) => (
        <div key={user.id}>
          <Link to={`/profile/${user.id}`}>
            {user.username}
            {' '}
          </Link>
        </div>
      ))}
    </div>
  );
}
