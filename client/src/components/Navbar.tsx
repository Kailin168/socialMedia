import React, {
  useContext,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../contexts/contexts';

export default function Navbar() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch('/logout', { method: 'DELETE' });
    setUser({});
    navigate('/login');
  };

  return (
    <div className="flex text-white justify-center bg-black mx-auto text-lg">
      <ul className="flex">
        <button type="button" onClick={() => navigate('/')} className="py-5 px-10 font-semibold hover:text-purple-700 transition duration-300">Home</button>
        <button type="button" onClick={handleLogout} className="py-5 px-10 font-semibold hover:text-purple-700 transition duration-300">Sign Out</button>
      </ul>
    </div>
  );
}
