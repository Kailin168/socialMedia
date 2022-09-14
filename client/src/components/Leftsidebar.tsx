import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  AiOutlineUser, AiOutlineGlobal, AiOutlineTranslation, AiOutlineDoubleLeft, AiOutlineDoubleRight, AiTwotoneCalendar, AiOutlineRobot,
} from 'react-icons/ai';
import { AuthContext } from '../contexts/contexts';
import Constants from '../utils/Constants';

export default function Leftsidebar() {
  const { user } = useContext(AuthContext);

  return (
    <div className="w-full">
      <div>
        {/* <div className="flex items-center justify-center mb-3">
          <Link to={`/profile/${user.id}`}>
            <img
              className="rounded-full shadow-xl p-1 w-30 h-30"
              width="250"
              src={user.image_url || Constants.DEFAULT_PROFILE_IMAGE_URL}
              alt="ProfileImage"
            />
          </Link>
        </div> */}

        <div className="w-58 shadow-md rounded-lg border border-gray-400 dark:bg-slate-100 dark:text-slate-900">
          <div className="flex items-center justify-center mb-10 mt-5">
            <Link to={`/profile/${user.id}`}>
              <img
                className="rounded-full shadow-xl p-1 w-30 h-30"
                width="250"
                src={user.image_url || Constants.DEFAULT_PROFILE_IMAGE_URL}
                alt="ProfileImage"
              />
            </Link>
          </div>
          <div className="text-3xl font-bold leading-none text-gray-900 dark:text-slate-700 flex justify-center mr-6 mt-5">Profile Details</div>
          <div className="items-center flex relative text-md font-large mt-7 pl-9">
            <div className="mr-2"><AiOutlineUser /></div>
            <div>
              {user.username}
            </div>
          </div>
          <div className="items-center flex relative text-md font-large mt-7 pl-9">
            <div className="mr-2"><AiOutlineRobot /></div>
            <div>
              {user.name}
            </div>
          </div>
          <div className="items-center flex relative text-md font-large mt-7 pl-9">
            <div className="mr-2"><AiOutlineTranslation /></div>
            <div>
              {user.language}
            </div>
          </div>
          <div className="items-center flex relative text-md font-large mt-7 pl-9">
            <div className="mr-2"><AiOutlineGlobal /></div>
            <div>
              {user.country}
            </div>
          </div>
          <div className="items-center flex relative text-md font-large mt-7 pl-9">
            <div className="mr-2"><AiOutlineDoubleLeft /></div>
            <div>
              Followers:
              {' '}
              {user.followee_count}
            </div>
          </div>
          <div className="items-center flex relative text-md font-large mt-7 mb-7 pl-9">
            <div className="mr-2"><AiOutlineDoubleRight /></div>
            <div>
              Following:
              {' '}
              {user.follower_count}
            </div>
          </div>
          <div className="items-center flex relative text-md font-large mt-7 mb-7 pl-9">
            <div className="mr-2"><AiTwotoneCalendar /></div>
            <div>
              Member since:
              {' '}
              {(new Date(user.created_at)).getFullYear()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
