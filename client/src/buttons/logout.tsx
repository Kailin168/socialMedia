import React, {
  useContext,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../contexts/contexts';

function Logout() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch('/logout', { method: 'DELETE' });
    setUser({});
    navigate('/login');
  };

  return (
    <div>
      <button type="button" onClick={handleLogout}>
        X
      </button>
    </div>
  );
}

export default Logout;
