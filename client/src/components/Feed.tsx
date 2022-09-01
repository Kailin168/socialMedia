import React, { useContext, useEffect, useState } from 'react';

import FeedCard from './FeedCard';

import { AuthContext } from '../contexts/contexts';

export default function Feed() {
  const { user } = useContext(AuthContext);

  const [content, setContent] = useState('');
  onst[errorMessage, setErrorMessage] = useState('');

  const handleContent = (e: ChangeEvent<HTMLInputElement>) => setContent(e.target.value);

  useEffect(() => {
    setContent('');
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const logIn = {
      content,
      user_id: user.id,
      media,
    };
    console.log(logIn);
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
      },
      body: JSON.stringify(logIn),
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
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mr-3 ml-3 mb-3">
        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500">Your message:</label>
        <textarea
          id="message"
          name="content"
          value={content || ''}
          onChange={handleContent}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="What's happening?"
        />
      </form>

      user
      <FeedCard />
      Share
    </div>
  );
}
