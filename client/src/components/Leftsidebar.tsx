import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  AiOutlineUser, AiOutlineGlobal, AiOutlineTranslation, AiOutlineDoubleLeft, AiOutlineDoubleRight,
} from 'react-icons/ai';
import { AuthContext } from '../contexts/contexts';
import Constants from '../utils/Constants';

export default function Leftsidebar() {
  const { user } = useContext(AuthContext);

  return (
    <div className="w-full">
      <div>
        <div className="flex items-center justify-center mb-3">
          <Link to={`/profile/${user.id}`}>
            <img
              className="rounded-full shadow-xl p-1 w-30 h-30"
              width="250"
              src={user.image_url || Constants.DEFAULT_PROFILE_IMAGE_URL}
              alt="ProfileImage"
            />
          </Link>
        </div>
        <div className="w-58 shadow-md rounded-lg border border-gray-200 dark:bg-slate-100 dark:text-slate-900 pl-7 mt-10">
          <div className="items-center flex relative text-md font-large mt-7">
            <div><AiOutlineUser /></div>
            <div>
              {user.username}
            </div>
          </div>
          <div className="items-center flex relative text-md font-large mt-7">
            <div><AiOutlineTranslation /></div>
            <div>
              {user.language}
            </div>
          </div>
          <div className="items-center flex relative text-md font-large mt-7">
            <div><AiOutlineGlobal /></div>
            <div>
              {user.country}
            </div>
          </div>
          <div className="items-center flex relative text-md font-large mt-7">
            <div><AiOutlineDoubleLeft /></div>
            <div>
              Followers:
              {user.followee_count}
            </div>
          </div>
          <div className="items-center flex relative text-md font-large mt-7 mb-7">
            <div><AiOutlineDoubleRight /></div>
            <div>
              Following:
              {user.follower_count}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
