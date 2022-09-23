import React, {
  useEffect, useState, ChangeEvent, FormEvent, useContext,
} from 'react';

import { formatDistanceToNow } from 'date-fns';

import { AiFillHeart, AiOutlineHeart, AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import emojiData from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import Constants from '../utils/Constants';

import { AuthContext } from '../contexts/contexts';

import { IComment, IPost } from '../types/ITypes';

interface Props {
  post: IPost;
  postHasAnUpdate: (updatedPost?: IPost, updateServer?: boolean, updateClient?: boolean) => void;
}

export default function FeedCard({ post, postHasAnUpdate }: Props) {
  const [showEmoji, setShowEmoji] = useState(false);
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = useContext(AuthContext);

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
              postHasAnUpdate(post, true, true);
            });
        } else {
          res.json()
            .then(({ errors }) => {
              setErrorMessage(errors?.[0]);
            });
        }
      });
  };

  const handleLikeOrUnlike = () => {
    fetch(post.i_liked ? '/post/unlike' : '/post/like', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
      },
      body: JSON.stringify({ post_id: post.id }),
    }).then(() => {
      postHasAnUpdate(undefined, true, false);
    });

    const newPost = post;
    newPost.i_liked = !post.i_liked;
    newPost.like_count = post.i_liked ? post.like_count + 1 : post.like_count - 1;
    postHasAnUpdate(newPost, false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addEmoji = (e:any) => {
    const emoji = e.native;
    setComment(comment + emoji);
    setShowEmoji(false);
  };

  const handleDeletePost = () => {
    fetch(`/delete_post/${post.id}`, {
      method: 'DElETE',
    })
      .then(() => {
        postHasAnUpdate(undefined, true, false);
      });
  };

  return (
    <div className="w-4/5 border-slate-500 border my-2 rounded-xl">
      <div className="rounded overflow-hidden shadow-lg">
        {post.image_url
      && (
      <div className="flex justify-center mt-5">
        <img src={post.image_url} alt="feed" />
      </div>
      )}
        <div className="flex justify-end mr-5 mt-3">
          {post.user_id === user.id ? (
            <button type="button" onClick={handleDeletePost} className="flex items-center">
              <div className="text-red-500"><AiFillDelete /></div>
              <div className="text-sm">DELETE with caution!</div>
            </button>
          ) : null }
        </div>
        <div className="px-6 py-4">
          <Link to={`/profile/${post.user.id}`}><div className="font-bold text-xl mb-2">{post.user.username}</div></Link>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
          >
            <button type="button" onClick={handleLikeOrUnlike} className="flex items-center">
              <div className="flex-row mr-3">
                {post.like_count}
                {' '}
                likes
              </div>
              <div>{post.i_liked ? <AiFillHeart className="text-red-500" /> : <AiOutlineHeart />}</div>
            </button>
          </div>
          <p className="text-gray-700 text-base">
            {post.content ? post.content : ''}
          </p>
        </div>
        <div className="mr-3 ml-3 mb-3">
          <form
            onSubmit={handleCommentSubmit}
            className="mr-3 ml-3 mb-3"
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <button
              type="button"
              onClick={() => {
                setShowEmoji(!showEmoji);
              }}
            >
              😀

            </button>
            <input
              type="text"
              name="comment"
              value={comment || ''}
              onChange={handleComment}
              className="resize-y rounded-md block p-2.5 ml-3 mr-3 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Leave a comment..."
            />
            <input style={{ cursor: 'pointer' }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg" type="submit" value="Comment" />
          </form>
          <div className="ml-3">
            {formatDistanceToNow(new Date(post.updated_at))}
            {' '}
            ago
          </div>
          {showEmoji && (
          <div style={{
            position: 'absolute',
          }}
          >
            <Picker
              data={emojiData}
              onEmojiSelect={addEmoji}
            />
          </div>
          )}
          <p style={{ color: 'red' }}>{errorMessage || null}</p>
        </div>
        <div className="flex-col ml-3 pb-5">
          {post.comments.map((commentObj: IComment) => (
            <div className="flex items-center" key={commentObj.id}>
              <img className="p-1 w-12 h-12 rounded-full ring-gray-300 dark:ring-gray-500" src={commentObj.user.image_url || Constants.DEFAULT_PROFILE_IMAGE_URL} alt="profile" />
              <h5 className="font-bold mr-2">
                {commentObj.user.username}
              </h5>
              <p>
                {commentObj.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
