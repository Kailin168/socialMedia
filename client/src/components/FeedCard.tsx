import React, {
  useEffect, useState, ChangeEvent, FormEvent,
} from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import { IComment, IPost } from '../types/IPost';

interface Props {
  post: IPost;
  postHasAnUpdate: (updatedPost: IPost) => void;
}

export default function FeedCard({ post, postHasAnUpdate }: Props) {
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleComment = (e: ChangeEvent<HTMLInputElement>) => setComment(e.target.value);

  useEffect(() => {
    setComment('');
  }, []);

  const handleCommentSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newComment = {
      comment,
      post_id: post.id,
    };
    fetch('/create_comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
      },
      body: JSON.stringify(newComment),
    })
      .then((res) => {
        if (res.ok) {
          res.json()
            .then((data) => {
              setErrorMessage('');
              setComment('');
              post.comments.push(data);
              postHasAnUpdate(post);
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
    <div className="max-w-lg rounded overflow-hidden shadow-lg">
      {post.media
      && (
      <div className="flex justify-center mt-5">
        <img className="w-3/4" src={post.media} alt="feed" />
      </div>
      )}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{post.user_id}</div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
        >
          {post.i_liked ? <AiFillHeart /> : <AiOutlineHeart />}
          {post.like_count}
        </div>
        <p className="text-gray-700 text-base">
          {post.content ? post.content : ''}
        </p>
      </div>
      <div className="mr-3 ml-3 mb-3">
        <form
          onSubmit={handleCommentSubmit}
          className="mr-3 ml-3 mb-3"
        >
          <input
            type="text"
            name="comment"
            value={comment || ''}
            onChange={handleComment}
            className="resize-y rounded-md block p-2.5 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Leave a comment..."
          />
          <input style={{ cursor: 'pointer' }} type="submit" value="Comment" />
        </form>
        <p style={{ color: 'red' }}>{errorMessage || null}</p>
      </div>
      <div>
        {post.comments.map((commentObj: IComment) => <div key={commentObj.id}>{commentObj.comment}</div>)}
      </div>
    </div>
  );
}
