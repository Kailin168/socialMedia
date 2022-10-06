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
      <div className="p-4 h-2/6 w-full max-w-md bg-white rounded-lg border shadow-md dark:bg-gray-50 dark:border-gray-100 overflow-auto">
        <h5 className="text-3xl font-bold leading-none text-gray-900 dark:text-slate-700 flex justify-center">Discover</h5>
        <div className="flow-root">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="py-3 sm:py-4">
              <div className="flex items-center justify-center">
                <div className="flex-shrink-0 overflow-auto">
                  {discoverUsers.length === 0 ? <span>Nothing to Discover</span> : discoverUsers.map((user) => (
                    <div key={user.id}>
                      <Link to={`/profile/${user.id}`}>
                        <div className="flex items-center rounded-md m-2 pt-2 pb-2 pr-8 pl-8 hover:bg-gray-200">
                          <img className="p-1 w-10 h-10 rounded-full ring-gray-300 dark:ring-gray-500" src={user.image_url || Constants.DEFAULT_PROFILE_IMAGE_URL} alt="profile" />
                          <div className="text-lg font-small text-gray-900 truncate dark:text-slate-700">{user.username}</div>
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
      <div className="h-4/6 w-full mt-10 max-w-md bg-white rounded-lg">
        <div className="flex justify-center font-semibold text-3xl text-slate-600">
          Sponsored
        </div>
        <a href="https://www.yelp.com/biz/b-and-k-fish-mini-market-brooklyn" target="_blank" rel="noreferrer">
          <img src="/willieads.png" alt="ad" />
        </a>
        <a href="https://buildsomethingnew.herokuapp.com/" target="_blank" rel="noreferrer">
          <img src="/Intro.gif" alt="tonyad" />
        </a>
      </div>
    </div>
  );
}
