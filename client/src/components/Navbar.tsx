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
          <ul className="flex">
            <button type="button" onClick={() => navigate('/')} className="py-5 px-10 font-semibold hover:text-slate-900 transition duration-300">Home</button>
            <button type="button" onClick={() => navigate('/message')} className="py-5 px-10 font-semibold hover:text-slate-900 transition duration-300">Message</button>
            <button type="button" onClick={() => navigate('/likes')} className="py-5 px-10 font-semibold hover:text-slate-900 transition duration-300">Likes</button>
            <button type="button" onClick={() => navigate('/setting')} className="py-5 px-10 font-semibold hover:text-slate-900 transition duration-300">Setting</button>
            <button type="button" onClick={handleLogout} className="py-5 px-10 font-semibold hover:text-slate-900 transition duration-300">Sign Out</button>
          </ul>
        </div>
        <div className="flex justify-end font-semibold mr-5">
          css style est. 1996
        </div>
      </div>
      <SearchBar />
    </div>
  );
}
