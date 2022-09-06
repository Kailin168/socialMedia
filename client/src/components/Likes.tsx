import React, { useState, useEffect } from 'react';

import { IPost } from '../types/IPost';
import FeedCard from './FeedCard';

export default function Likes() {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
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
  }, []);

  return (
    <>
      {
        posts.map((post) => <FeedCard key={post.id} post={post} />)
      }
    </>
  );
}
