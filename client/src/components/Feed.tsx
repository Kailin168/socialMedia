import React, {
  useEffect, useState, FormEvent, ChangeEvent,
} from 'react';

import { AiFillFileImage } from 'react-icons/ai';
import FeedCard from './FeedCard';

import { IPost } from '../types/ITypes';

export default function Feed() {
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState<IPost[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [media, setMedia] = useState<File | null>(null);

  const handleContent = (e: ChangeEvent<HTMLInputElement>) => setContent(e.target.value);

  const fetchFromServer = () => {
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
  };

  useEffect(() => {
    setContent('');
    fetchFromServer();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (media) {
      formData.append('image', media);
    }
    formData.append('content', content);
    fetch('/create_post', {
      method: 'POST',
      body: formData,
    })
      .then((res) => {
        if (res.ok) {
          res.json()
            .then(() => {
              setErrorMessage('');
            });
        } else {
          res.json()
            .then(({ errors }) => {
              setErrorMessage(errors?.[0]);
            });
        }
      });
    setContent('');
    setMedia(null);
  };

  const postHasAnUpdate = (updatedPost?: IPost, updateServer = true, updateClient = true) => {
    if (updateClient && updatedPost !== undefined) {
      const updatedPosts = posts.map((post) => {
        if (post.id === updatedPost.id) {
          return updatedPost;
        }
        return post;
      });
      setPosts([...updatedPosts]);
    }

    if (updateServer) {
      fetchFromServer();
    }
  };

  return (
    <div className="w-4/5 flex flex-col justify-center">
      <form onSubmit={handleSubmit} className="sticky top-0 bg-gray-50 pt-3 pr-3 pl-3 pb-2 mb-8 ">
        <label htmlFor="message" className="block mb-2 text-xl font-extrabold text-gray-900 dark:text-gray-500">New Post</label>
        <input
          type="text"
          name="content"
          value={content || ''}
          onChange={handleContent}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="What's happening?"
        />
        <label>
          {' '}
          <AiFillFileImage />
          {' '}
        </label>
        <input
          type="file"
          accept="image/*"
          name="media"
          placeholder="media"
          onChange={(e) => {
            if (e.target.files) { setMedia(e.target.files[0]); }
          }}
        />
        <div className="flex justify-end">
          <input style={{ cursor: 'pointer' }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mr-5" type="submit" value="Create" />
        </div>

      </form>
      <p style={{ color: 'red' }}>{errorMessage || null}</p>
      <div className="flex flex-col items-center justify-center">
        {
          posts.map((post) => <FeedCard key={post.id} post={post} postHasAnUpdate={postHasAnUpdate} />)
        }
      </div>
    </div>
  );
}
