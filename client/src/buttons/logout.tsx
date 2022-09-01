import React, {
  useContext,
} from 'react';

import { AuthContext } from '../contexts/contexts';

function Logout() {
  const { handleLogout } = useContext(AuthContext);

  return (
    <div>
      <button type="button" onClick={handleLogout}>
        X
      </button>
    </div>
  );
}

export default Logout;
