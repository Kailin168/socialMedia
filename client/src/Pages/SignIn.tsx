import React, {
  useState, useEffect, useContext, ChangeEvent, FormEvent,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../contexts/contexts';

function SignIn() {
  const { handleLogin } = useContext(AuthContext);

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
              setErrorMessage('');
              handleLogin(data);
              navigate('/');
            });
        } else {
          res.json()
            .then(({ error }) => setErrorMessage(error));
        }
      });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col">
        <div className="w-full max-w-xs">
          <img src="/lgtitle.png" alt="ad" className="items-center mt-4 mb-10 justify-center" />
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-slate-900" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 border-slate-900" htmlFor="username">
                Username
                <input
                  className="border-slate-900 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="username"
                  placeholder="username"
                  value={username || ''}
                  onChange={handleUsername}
                />
              </label>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
                <input
                  className="border-slate-900 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  name="password"
                  placeholder="password"
                  value={password || ''}
                  onChange={handlePassword}
                />
              </label>
            </div>
            <p className="text-red-500 text-xs italic">{errorMessage || null}</p>
            <input className="flex items-center justify-between bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="Log In" />
          </form>
        </div>
        <button className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" type="button" onClick={() => { navigate('/createAccount'); }}>Do not have an account? Register here</button>
        <p className="text-center text-gray-500 text-xs">
          &copy;2022 HandCrafted by Kai
        </p>
      </div>
    </div>
  );
}
export default SignIn;
