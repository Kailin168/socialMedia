import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { IUser, EmptyUserValue, IPost } from '../types/ITypes';
import FeedCard from './FeedCard';

// import { AuthContext } from '../contexts/contexts';

export default function ProfileDetails() {
  const params = useParams();
  const location = useLocation();
  // const { user } = useContext(AuthContext);
  const [otherUser, setOtherUser] = useState<IUser>(EmptyUserValue);

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

  return (
    <div>
      <div className="max-w-lg rounded overflow-hidden shadow-lg">
        <div className="flex justify-center mt-5">
          <img className="w-3/4" src={otherUser.image_url} alt="feed" />
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
      {/* {otherUser.posts.followee_id.some((followee_id) => like.user_id === user.id) ? <AiFillHeart /> : <AiOutlineHeart />} */}
      {otherUser.i_am_following ? (
        <button type="button" onClick={handleUnFollow}>
          Unfollow
        </button>
      ) : (
        <button type="button" onClick={handleFollow}>
          Follow
        </button>
      )}
      {
        otherUser.posts.map((post) => (
          <FeedCard key={post.id} post={post} postHasAnUpdate={postHasAnUpdate} />
        ))
      }
    </div>
  );
}
