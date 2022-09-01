import React, { useContext } from 'react';
import { AuthContext } from '../contexts/contexts';

export default function Feed() {
  const { user } = useContext(AuthContext);

  return (

    <div className="max-w-lg rounded overflow-hidden shadow-lg">
      <div className="flex justify-center mt-5">
        <img className="w-3/4" src={user.profile_image} alt="Sunset in the mountains" />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
        <p className="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
        </p>
      </div>
      <div className="mr-3 ml-3 mb-3">
        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500">Your message:</label>
        <textarea id="message" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-900 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..." />
      </div>
    </div>

  );
}
