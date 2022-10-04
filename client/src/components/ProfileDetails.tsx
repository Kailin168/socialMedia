import React, { useEffect, useState, useContext } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { IUser, EmptyUserValue, IPost } from '../types/ITypes';
import FeedCard from './FeedCard';
import { DiscoverContext, AuthContext } from '../contexts/contexts';
import { DEFAULT_PROFILE_IMAGE_URL } from '../utils/Constants';

export default function ProfileDetails() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [otherUser, setOtherUser] = useState<IUser>(EmptyUserValue);
  const { fetchDiscoverUsers } = useContext(DiscoverContext);
  const { fetchUser } = useContext(AuthContext);

  const fetchFromServer = () => {
    fetch(`/user_info/${params.userId}`)
      .then((res) => res.json())
      .then((data) => {
        setOtherUser(data);
      });
  };

  useEffect(() => {
    if (location.pathname.includes('/profile/')) {
      // do regex for pathname
      fetchFromServer();
    }
  }, [location.pathname]);

  const handleFollow = () => {
    fetch(`/users/${params.userId}/follow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
      },
      body: JSON.stringify({ user_id: params.userId }),
    })
      .then(() => {
        fetchDiscoverUsers();
        fetchUser();
      });
    otherUser.i_am_following = true;
    setOtherUser({ ...otherUser });
  };

  const handleUnFollow = () => {
    fetch(`/users/${params.userId}/unfollow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
      },
      body: JSON.stringify({ user_id: params.userId }),
    })
      .then(() => {
        fetchDiscoverUsers();
        fetchUser();
      });
    otherUser.i_am_following = false;
    setOtherUser({ ...otherUser });
  };

  const postHasAnUpdate = (updatedPost?: IPost, updateServer = true, updateClient = true) => {
    if (updateClient && updatedPost !== undefined) {
      const updatedPosts = otherUser.posts.map((post) => {
        if (post.id === updatedPost.id) {
          return updatedPost;
        }
        return post;
      });
      otherUser.posts = updatedPosts;
      setOtherUser({ ...otherUser });
    }

    if (updateServer) {
      fetchFromServer();
    }
  };

  function handleClick() {
    navigate(`/chatroom/${params.userId}`);
  }

  return (
    <div className="w-4/5 flex flex-col justify-center">
      <div className="flex justify-center">
        <div className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-3xl hover:bg-gray-100 dark:border-gray-200 dark:bg-gray-200 dark:hover:bg-gray-200 mb-10">
          <img className="object-cover w-full h-full rounded md:h-60 md:w-auto md:rounded-full pl-2 pr-6" src={otherUser.image_url || DEFAULT_PROFILE_IMAGE_URL} alt="feed" />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <p className="mb-2 text-2xl font-bold tracking-tight dark:text-slate-700">
              {otherUser.username}
            </p>
            <p className="mb-3 font-normal dark:text-gray-700">
              {otherUser.name}
            </p>
            <div className="mb-3 font-normal dark:text-gray-500">{otherUser.bio}</div>
            <div className="mb-3 font-normal dark:text-gray-500">
              {otherUser.email}
            </div>
            <p className="mb-3 font-normal dark:text-gray-500">
              {otherUser.country}
            </p>
            <p className="mb-3 font-normal dark:text-gray-500">
              {otherUser.language}
            </p>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="w-full flex justify-center">
          {otherUser.i_am_following ? (
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg inline-flex mr-5 min-w-fit" type="button" onClick={handleUnFollow}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
              </svg>

              <span>Unfollow</span>
            </button>
          ) : (
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg inline-flex mr-5 min-w-1/6 " type="button" onClick={handleFollow}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
              </svg>

              <span>Follow</span>
            </button>
          )}
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg inline-flex mr-5 min-w-fit" type="button" onClick={handleClick}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
            </svg>

            <span>Message</span>
          </button>
        </div>

      </div>
      <div className="flex flex-col w-full items-center justify-center mt-10">
        {
        otherUser.posts.map((post) => (
          <FeedCard key={post.id} post={post} postHasAnUpdate={postHasAnUpdate} />
        ))
      }
      </div>
    </div>
  );
}
