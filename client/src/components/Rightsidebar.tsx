import React, {
  useEffect, useContext,
} from 'react';
import { Link } from 'react-router-dom';
import Constants from '../utils/Constants';

import { DiscoverContext } from '../contexts/contexts';

export default function Rightsidebar() {
  const { discoverUsers, fetchDiscoverUsers } = useContext(DiscoverContext);

  useEffect(() => {
    fetchDiscoverUsers();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="h-1/2 border">
        {discoverUsers.length === 0 ? <span>Nothing to Discover</span> : discoverUsers.map((user) => (
          <div key={user.id}>
            <Link to={`/profile/${user.id}`}>
              <div className="flex items-center">
                <img className="p-1 w-10 h-10 rounded-full ring-gray-300 dark:ring-gray-500" src={user.image_url || Constants.DEFAULT_PROFILE_IMAGE_URL} alt="profile" />
                <div>{user.username}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div>
        Ads
      </div>
    </div>
  );
}
