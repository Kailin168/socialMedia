import React, { useState, useEffect } from 'react';

import { IPost } from '../types/IPost';
import FeedCard from './FeedCard';

export default function Likes() {
  const [posts, setPosts] = useState<IPost[]>([]);

  const fetchFromServer = () => {
    fetch('/liked_post')
      .then((res) => {
        if (res.ok) {
          res.json()
            .then((data) => {
              setPosts(data);
            });
        } else {
          setPosts([]);
        }
      });
  };

  useEffect(() => {
    fetchFromServer();
  }, []);

  const postHasAnUpdate = (updatedPost: IPost) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === updatedPost.id) {
        return updatedPost;
      }
      return post;
    });
    setPosts([...updatedPosts]);

    fetchFromServer();
  };

  return (
    <>
      {
        posts.map((post) => <FeedCard key={post.id} post={post} postHasAnUpdate={postHasAnUpdate} />)
      }
    </>
  );
}
