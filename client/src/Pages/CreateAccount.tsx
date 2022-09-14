import React, {
  useState, useEffect, useContext, ChangeEvent, FormEvent,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../contexts/contexts';

function CreateAccount() {
  const { handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [bio, setBio] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [language, setLanguage] = useState('');
  const [accountPassword, setAccountPassword] = useState('');
  const [accountUsername, setAccountUsername] = useState('');

  // const handleAccountProfileImage = (e: ChangeEvent<HTMLInputElement>) => setProfileImage(e.target.value);
  const handleAccountBio = (e: ChangeEvent<HTMLInputElement>) => setBio(e.target.value);
  const handleAccountName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const handleAccountCountry = (e: ChangeEvent<HTMLInputElement>) => setCountry(e.target.value);
  const handleAccountLanguage = (e: ChangeEvent<HTMLInputElement>) => setLanguage(e.target.value);
  const handleAccountUsername = (e: ChangeEvent<HTMLInputElement>) => setAccountUsername(e.target.value);
  const handleAccountPassword = (e: ChangeEvent<HTMLInputElement>) => setAccountPassword(e.target.value);
  const handleAccountEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  useEffect(() => {
    setErrorMessage('');
    setName('');
    setBio('');
    setAccountUsername('');
    setAccountPassword('');
    setEmail('');
    setCountry('');
    setLanguage('');
    setProfileImage(null);
  }, []);

  const handleAccountSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (profileImage) {
      formData.append('image', profileImage);
    }
    formData.append('name', name);
    formData.append('bio', bio);
    formData.append('country', country);
    formData.append('language', language);
    formData.append('email', email);
    formData.append('username', accountUsername);
    formData.append('password', accountPassword);

    setErrorMessage('');
    fetch('/create_user', {
      method: 'POST',
      body: formData,
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
            .then(({ errors }) => {
              setErrorMessage(errors?.[0]);
            });
        }
      });
  };

  function handleClick() {
    navigate('/login');
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-max">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-slate-900" onSubmit={handleAccountSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Name">Name</label>
            <input
              className="border border-slate-900 shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="name"
              placeholder="Full Name"
              value={name || ''}
              onChange={handleAccountName}
            />
          </div>
          <div style={{ margin: '10px 0' }}>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Bio">Bio</label>
            <input
              className=" border-slate-900 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="bio"
              placeholder="Bio"
              value={bio || ''}
              onChange={handleAccountBio}
            />
          </div>
          <div style={{ margin: '10px 0' }}>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Country">Country</label>
            <input
              className=" border-slate-900 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="country"
              placeholder="Country"
              value={country || ''}
              onChange={handleAccountCountry}
            />
          </div>
          <div style={{ margin: '10px 0' }}>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Language">Language</label>
            <input
              className=" border-slate-900 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="language"
              placeholder="Language"
              value={language || ''}
              onChange={handleAccountLanguage}
            />
          </div>
          <div style={{ margin: '10px 0' }}>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Email">Email</label>
            <input
              className=" border-slate-900 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="email"
              placeholder="e-mail"
              value={email || ''}
              onChange={handleAccountEmail}
            />
          </div>
          <div style={{ margin: '10px 0' }}>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Profile Picture">Profile Picture</label>
            <input
              className=" border-slate-900 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="file"
              accept="image/*"
              name="profile_image"
              placeholder="profile_image"
              onChange={(e) => {
                if (e.target.files) { setProfileImage(e.target.files[0]); }
              }}
            />
          </div>
          <div style={{ margin: '10px 0' }}>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Username">Username</label>
            <input
              className=" border-slate-900 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="username"
              placeholder="username"
              value={accountUsername || ''}
              onChange={handleAccountUsername}
            />
          </div>
          <div style={{ margin: '10px 0' }}>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Password">Password</label>
            <input
              className=" border-slate-900 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              name="password"
              placeholder="password"
              value={accountPassword || ''}
              onChange={handleAccountPassword}
            />
          </div>
          <p className="text-red-500 text-xs italic">{errorMessage || null}</p>
          <input className="flex items-center justify-between bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="Create an Account" />
        </form>
        <div>
          <button type="button" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" onClick={handleClick}>Back to Log in</button>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
