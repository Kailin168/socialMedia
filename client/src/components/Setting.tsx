import React, {
  useContext,
  useState, useEffect, ChangeEvent, FormEvent,
} from 'react';
import { AuthContext } from '../contexts/contexts';

export default function Setting() {
  const { handleLogin } = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [bio, setBio] = useState('');
  const [country, setCountry] = useState('');
  const [language, setLanguage] = useState('');

  const handleAccountBio = (e: ChangeEvent<HTMLInputElement>) => setBio(e.target.value);
  const handleAccountCountry = (e: ChangeEvent<HTMLInputElement>) => setCountry(e.target.value);
  const handleAccountLanguage = (e: ChangeEvent<HTMLInputElement>) => setLanguage(e.target.value);

  useEffect(() => {
    setErrorMessage('');
    setBio('');
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
    formData.append('bio', bio);
    formData.append('country', country);
    formData.append('language', language);

    setErrorMessage('');
    fetch('/update_user', {
      method: 'PATCH',
      body: formData,
    })
      .then((res) => {
        if (res.ok) {
          res.json()
            .then((data) => {
              setErrorMessage('');
              handleLogin(data);
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
      <div className="max-w-lg rounded overflow-hidden shadow-lg">
        <div className="flex justify-center mt-5">
          <img className="w-3/4" src={user.image_url} alt="feed" />
        </div>
        <div className="px-6 py-4">
          <p className="text-gray-700 text-base">
            {user.username}
          </p>
          <p className="text-gray-700 text-base">
            {user.name}
          </p>
          <div className="font-bold text-xl mb-2">{user.bio}</div>
          <div>
            {user.email}
          </div>
          <p className="text-gray-700 text-base">
            {user.country}
          </p>
          <p className="text-gray-700 text-base">
            {user.language}
          </p>
        </div>
      </div>
      Update an Account:
      <form onSubmit={handleAccountSubmit}>
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
          <label>Profile Picture:</label>
          <input
            type="file"
            accept="image/*"
            name="profile_image"
            placeholder="profile_image"
            onChange={(e) => {
              if (e.target.files) { setProfileImage(e.target.files[0]); }
            }}
          />
        </div>
        <p style={{ color: 'red' }}>{errorMessage || null}</p>
        <input type="submit" />
      </form>
    </div>
  );
}
