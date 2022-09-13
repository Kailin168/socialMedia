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
      <div className="p-4 h-2/5 w-full max-w-md bg-white rounded-lg border shadow-md dark:bg-gray-100 dark:border-gray-100">
        <h5 className="text-3xl font-bold leading-none text-gray-900 dark:text-slate-700 flex justify-center">Discover</h5>
        <div className="flow-root">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="py-3 sm:py-4">
              <div className="flex items-center justify-center">
                <div className="flex-shrink-0 overflow-auto">
                  {discoverUsers.length === 0 ? <span>Nothing to Discover</span> : discoverUsers.map((user) => (
                    <div key={user.id}>
                      <Link to={`/profile/${user.id}`}>
                        <div className="flex items-center border-2 rounded-md m-2 pt-2 pb-2 pr-8 pl-8">
                          <img className="p-1 w-12 h-12 rounded-full ring-gray-300 dark:ring-gray-500" src={user.image_url || Constants.DEFAULT_PROFILE_IMAGE_URL} alt="profile" />
                          <div className="text-xl font-medium text-gray-900 truncate dark:text-slate-700">{user.username}</div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="p-4 h-3/5 w-full mt-10 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-100 dark:border-gray-100">
        <div>
          Ads
        </div>
      </div>
    </div>
  );
}
