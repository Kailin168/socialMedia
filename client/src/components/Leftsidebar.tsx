import React, { useContext } from 'react';
import { AuthContext } from '../contexts/contexts';

export default function Leftsidebar() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <div>
        <div className="flex items-center justify-center mb-3">
          <img
            className="rounded-full border-solid border-2 border-sky-200"
            width="150"
            src={user.image_url}
            alt="ProfileImage"
          />
        </div>
        <div>
          @
          {user.username}
        </div>
        <div>
          Language:
          {user.language}

        </div>
        <div>
          Country:
          {user.country}
        </div>
      </div>
      <ul>
        <li>
          <div>
            Followers:
            {user.followee_count}
          </div>
        </li>
        <li>
          <div>
            Following:
            {user.follower_count}

          </div>

        </li>

      </ul>
    </div>
  );
}
