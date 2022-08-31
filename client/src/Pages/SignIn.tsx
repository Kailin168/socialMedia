import React, {
  useState, useEffect, useContext, ChangeEvent, FormEvent,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../contexts/contexts';

function SignIn() {
  const { setUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUsername = (e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  useEffect(() => {
    setUsername('');
    setPassword('');
    setErrorMessage('');
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const logIn = {
      username,
      password,
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
              setUser(data);
              navigate('/');
            });
        } else {
          res.json()
            .then(({ error }) => setErrorMessage(error));
        }
      });
  };

  return (
    <div style={{
      textAlign: 'center', padding: '20px', background: '#98c1d9', borderRadius: '8px', margin: '0 auto', width: '50%',
    }}
    >
      <div>
        SIGN IN
        <form onSubmit={handleSubmit}>
          <div style={{ margin: '10px 0' }}>
            <label>
              Username:
              <input
                type="text"
                name="username"
                placeholder="username"
                value={username || ''}
                onChange={handleUsername}
              />
            </label>
          </div>
          <div style={{ margin: '10px 0' }}>
            <label>
              Password:
              <input
                type="password"
                name="password"
                placeholder="password"
                value={password || ''}
                onChange={handlePassword}
              />
            </label>
          </div>
          <p style={{ color: 'red' }}>{errorMessage || null}</p>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}
export default SignIn;
