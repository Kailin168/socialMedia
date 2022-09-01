import React, {
  useState, useEffect, useContext, ChangeEvent, FormEvent,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../contexts/contexts';

function CreateAccount() {
  const { handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [bio, setBio] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [language, setLanguage] = useState('');
  const [accountPassword, setAccountPassword] = useState('');
  const [accountUsername, setAccountUsername] = useState('');

  const handleAccountProfileImage = (e: ChangeEvent<HTMLInputElement>) => setProfileImage(e.target.value);
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
    setProfileImage('');
  }, []);

  const handleAccountSubmit = (e: FormEvent) => {
    e.preventDefault();
    const createAccount = {
      name,
      profile_image: profileImage,
      bio,
      country,
      language,
      email,
      username: accountUsername,
      password: accountPassword,
    };
    console.log(createAccount);

    setErrorMessage('');
    fetch('/create_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
      },
      body: JSON.stringify(createAccount),
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

  return (
    <div>
      Create an Account:
      <form onSubmit={handleAccountSubmit}>
        <div style={{ margin: '10px 0' }}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={name || ''}
            onChange={handleAccountName}
          />
        </div>
        <div style={{ margin: '10px 0' }}>
          <label>Bio:</label>
          <input
            type="text"
            name="bio"
            placeholder="Bio"
            value={bio || ''}
            onChange={handleAccountBio}
          />
        </div>
        <div style={{ margin: '10px 0' }}>
          <label>Country:</label>
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={country || ''}
            onChange={handleAccountCountry}
          />
        </div>
        <div style={{ margin: '10px 0' }}>
          <label>Language:</label>
          <input
            type="text"
            name="language"
            placeholder="Language"
            value={language || ''}
            onChange={handleAccountLanguage}
          />
        </div>
        <div style={{ margin: '10px 0' }}>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            placeholder="e-mail"
            value={email || ''}
            onChange={handleAccountEmail}
          />
        </div>
        <div style={{ margin: '10px 0' }}>
          <label>Profile Picture:</label>
          <input
            type="text"
            name="profile_image"
            placeholder="profile_image"
            value={profileImage || ''}
            onChange={handleAccountProfileImage}
          />
        </div>
        <div style={{ margin: '10px 0' }}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={accountUsername || ''}
            onChange={handleAccountUsername}
          />
        </div>
        <div style={{ margin: '10px 0' }}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={accountPassword || ''}
            onChange={handleAccountPassword}
          />
        </div>
        <p style={{ color: 'red' }}>{errorMessage || null}</p>
        <input type="submit" />
      </form>
    </div>
  );
}

export default CreateAccount;
