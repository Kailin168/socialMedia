import React, { useContext } from 'react';
import { AuthContext } from '../contexts/contexts';

export default function Setting() {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-lg rounded overflow-hidden shadow-lg">
      <div className="flex justify-center mt-5">
        <img className="w-3/4" src={user.profile_image} alt="feed" />
      </div>
      <div className="px-6 py-4">
        <p className="text-gray-700 text-base">
          {user.username}
        </p>
        <p className="text-gray-700 text-base">
          {user.name}
        </p>
        <div className="font-bold text-xl mb-2">{user.bio}</div>
        <div>
          {user.email}
        </div>
        <p className="text-gray-700 text-base">
          {user.country}
        </p>
        <p className="text-gray-700 text-base">
          {user.language}
        </p>
      </div>
    </div>
  );
}
