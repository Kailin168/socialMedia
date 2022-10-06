import React, {
  useContext,
} from 'react';
import { useNavigate } from 'react-router-dom';

import SearchBar from './SearchBar';

import { AuthContext } from '../contexts/contexts';

export default function Navbar() {
  const { handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <div className="flex text-white justify-center bg-blue-500 mx-auto text-lg">
          <div className="w-1/3 flex items-center relative title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900"><img src="/title.png" alt="ad" className="ml-4 items-center w-60 mt-4" /></div>
          <div className="w-1/3 min-w-fit flex justify-center">
            <ul className="flex text-white bg-blue-500 mx-auto text-2xl">
              <button type="button" onClick={() => navigate('/')} className="py-5 px-10 font-semibold hover:text-slate-900 transition duration-300">Home</button>
              <button type="button" onClick={() => navigate('/chat')} className="py-5 px-10 font-semibold hover:text-slate-900 transition duration-300">Chat</button>
              <button type="button" onClick={() => navigate('/likes')} className="py-5 px-10 font-semibold hover:text-slate-900 transition duration-300">Likes</button>
              <button type="button" onClick={() => navigate('/setting')} className="py-5 px-10 font-semibold hover:text-slate-900 transition duration-300">Setting</button>
              <button type="button" onClick={handleLogout} className="py-5 px-10 font-semibold hover:text-slate-900 transition duration-300">Sign Out</button>
            </ul>
          </div>
          <div className="w-1/3 flex justify-end text-sm mr-5" />
        </div>
      </div>
      <SearchBar />
    </div>
  );
}
