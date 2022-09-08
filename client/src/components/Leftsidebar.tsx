import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/contexts';
import Constants from '../utils/Constants';

export default function Leftsidebar() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <div>
        <div className="flex items-center justify-center mb-3">
          <Link to={`/profile/${user.id}`}>
            <img
              className="rounded-full border-solid border-2 border-sky-200"
              width="150"
              src={user.image_url || Constants.DEFAULT_PROFILE_IMAGE_URL}
              alt="ProfileImage"
            />
          </Link>
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
