import React, {
  useContext, useEffect, useState, FormEvent, ChangeEvent,
} from 'react';

import FeedCard from './FeedCard';

import { AuthContext } from '../contexts/contexts';
import { IPost } from '../types/IPost';

export default function Feed() {
  const { user } = useContext(AuthContext);

  const [content, setContent] = useState('');
  const [posts, setPosts] = useState<IPost[]>([]);
  // const [media, setmedia] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleContent = (e: ChangeEvent<HTMLInputElement>) => setContent(e.target.value);

  useEffect(() => {
    setContent('');

    fetch('/feed')
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPost = {
      content,
      user_id: user.id,
      // media,
    };
    console.log(newPost);
    fetch('/create_post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
      },
      body: JSON.stringify(newPost),
    })
      .then((res) => {
        if (res.ok) {
          res.json()
            .then((data) => {
              console.log(data);
              setErrorMessage('');
            });
        } else {
          res.json()
            .then(({ errors }) => {
              setErrorMessage(errors?.[0]);
            });
        }
      });
    const resetForm = e.target as HTMLFormElement;
    resetForm.reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mr-3 ml-3 mb-3">
        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500">New Post</label>
        <input
          type="text"
          name="content"
          value={content || ''}
          onChange={handleContent}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="What's happening?"
        />
        <input type="submit" value="Create" />
      </form>
      <p style={{ color: 'red' }}>{errorMessage || null}</p>
      {
        posts.map((post) => <FeedCard key={post.id} post={post} />)
      }
    </div>
  );
}
