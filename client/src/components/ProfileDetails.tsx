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
    navigate(`/message/${params.userId}`);
  }

  return (
    <div>
      <div className="max-w-lg rounded overflow-hidden shadow-lg">
        <div className="flex justify-center mt-5">
          <img className="w-3/4" src={otherUser.image_url || DEFAULT_PROFILE_IMAGE_URL} alt="feed" />
        </div>
        <div className="px-6 py-4">
          <p className="text-gray-700 text-base">
            {otherUser.username}
          </p>
          <p className="text-gray-700 text-base">
            {otherUser.name}
          </p>
          <div className="font-bold text-xl mb-2">{otherUser.bio}</div>
          <div>
            {otherUser.email}
          </div>
          <p className="text-gray-700 text-base">
            {otherUser.country}
          </p>
          <p className="text-gray-700 text-base">
            {otherUser.language}
          </p>
        </div>
      </div>
      {otherUser.i_am_following ? (
        <button className="bg-blue-300 hover:bg-blue-500 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" type="button" onClick={handleUnFollow}>
          <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
          <span>Unfollow</span>
        </button>
      ) : (
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" type="button" onClick={handleFollow}>
          <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
          <span>follow</span>
        </button>
      )}
      <button className="bg-blue-300 hover:bg-blue-500 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" type="button" onClick={handleClick}>
        <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path /></svg>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" />

        <span>Message</span>
      </button>
      {
        otherUser.posts.map((post) => (
          <FeedCard key={post.id} post={post} postHasAnUpdate={postHasAnUpdate} />
        ))
      }
    </div>
  );
}
