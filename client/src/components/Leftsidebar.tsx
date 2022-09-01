import React, { useContext } from 'react';
import { AuthContext } from '../contexts/contexts';

export default function Leftsidebar() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <div>
        <div>
          <div>
            @username:
            {' '}
            {user.username}
          </div>
          <div>Name : *****</div>
          <div>
            Country:
          </div>
        </div>
        <ul>
          <li>
            <div>Followers</div>
          </li>
          <li>
            <div>Following</div>
            <div>6758</div>
          </li>
          <li>*****</li>
        </ul>
      </div>
    </div>
  );
}
