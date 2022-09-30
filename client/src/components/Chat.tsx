import React, {
  useEffect, useContext,
} from 'react';
import { Link } from 'react-router-dom';
import { DiscoverContext } from '../contexts/contexts';
import Constants from '../utils/Constants';

function Chat() {
  const { followedUsers, fetchFollowedUsers } = useContext(DiscoverContext);

  useEffect(() => {
    fetchFollowedUsers();
  }, []);

  return (
    <div className="w-full border rounded border-blue-700 flex flex-col justify-center">
      <div className="flex flex-col h-full">
        <div className="p-4 h-2/6 w-full max-w-md bg-white rounded-lg border shadow-md dark:bg-gray-50 dark:border-gray-100 overflow-auto">
          <h5 className="text-3xl font-bold leading-none text-gray-900 dark:text-slate-700 flex justify-center">Start Chatting</h5>
          <div className="flow-root">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              <li className="py-3 sm:py-4">
                <div className="flex items-center justify-center">
                  <div className="flex-shrink-0 overflow-auto">
                    {followedUsers.length === 0 ? <span>No One to Chat to</span> : followedUsers.map((user) => (
                      <div key={user.id}>
                        <Link to={`/chatroom/${user.id}`}>
                          <div className="flex items-center rounded-md m-2 pt-2 pb-2 pr-8 pl-8 hover:bg-gray-200">
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
      </div>
    </div>
  );
}

export default Chat;
