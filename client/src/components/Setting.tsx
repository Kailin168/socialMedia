import React, {
  useContext,
  useState, useEffect, ChangeEvent, FormEvent,
} from 'react';
import { AuthContext } from '../contexts/contexts';
import { DEFAULT_PROFILE_IMAGE_URL } from '../utils/Constants';

export default function Setting() {
  const { handleLogin } = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [bio, setBio] = useState('');
  const [country, setCountry] = useState('');
  const [language, setLanguage] = useState('');

  // const handleAccountBio = (e: React.ChangeEvent<HTMLTextAreaElement>) => setBio(e.target.value);
  const handleAccountCountry = (e: ChangeEvent<HTMLInputElement>) => setCountry(e.target.value);
  const handleAccountLanguage = (e: ChangeEvent<HTMLInputElement>) => setLanguage(e.target.value);

  useEffect(() => {
    setErrorMessage('');
    setBio(user.bio);
    setCountry(user.country);
    setLanguage(user.language);
    setProfileImage(null);
  }, [user]);

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
    setBio('');
    setCountry('');
    setLanguage('');
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex justify-center">
        <div className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-3xl hover:bg-gray-100 dark:border-gray-200 dark:bg-gray-200 dark:hover:bg-gray-200 mb-10">
          <img className="object-cover w-full h-full rounded md:h-60 md:w-auto md:rounded-full pl-2 pr-6" src={user.image_url || DEFAULT_PROFILE_IMAGE_URL} alt="feed" />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <p className="mb-2 text-2xl font-bold tracking-tight dark:text-slate-700">
              Username:
              {' '}
              {user.username}
            </p>
            <p className="mb-3 font-normal dark:text-gray-700">
              Full name:
              {' '}
              {user.name}
            </p>
            <div className="mb-3 font-normal dark:text-gray-500">
              Bio:
              {' '}
              {user.bio}
            </div>
            <div className="mb-3 font-normal dark:text-gray-500">
              Email:
              {' '}
              {user.email}
            </div>
            <p className="mb-3 font-normal dark:text-gray-500">
              Country:
              {' '}
              {user.country}
            </p>
            <p className="mb-3 font-normal dark:text-gray-500">
              Language:
              {' '}
              {user.language}
            </p>
          </div>
        </div>
      </div>
      <div className="text-gray-700 text-center text-2xl m-4 w-3/4">Update Account:</div>
      <form className="w-full max-w-3xl" onSubmit={handleAccountSubmit}>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-full">
            <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4">Bio:</label>
            <textarea
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              name="bio"
              placeholder="Bio"
              rows={3}
              value={bio || ''}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-full">
            <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4">Country:</label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              type="text"
              name="country"
              placeholder="Country"
              value={country || ''}
              onChange={handleAccountCountry}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-full">
            <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4">Language:</label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              type="text"
              name="language"
              placeholder="Language"
              value={language || ''}
              onChange={handleAccountLanguage}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-full">
            <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4">Profile Picture:</label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              type="file"
              accept="image/*"
              name="profile_image"
              placeholder="profile_image"
              onChange={(e) => {
                if (e.target.files) { setProfileImage(e.target.files[0]); }
              }}
            />
          </div>
        </div>
        <p style={{ color: 'red' }}>{errorMessage || null}</p>
        <div className="flex justify-end">
          <input className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit" />
        </div>
      </form>
    </div>
  );
}
