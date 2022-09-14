import React, {
  useState, ChangeEvent, useEffect, FocusEvent,
} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IUser } from '../types/ITypes';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const [isSearchHidden, setIsSearchHidden] = useState(true);
  function handleOnChangeSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
  }
  const [allUsers, setAllUsers] = useState<IUser[]>([]);

  const location = useLocation();

  useEffect(() => {
    fetch('/all_user')
      .then((res) => {
        if (res.ok) {
          res.json()
            .then((data) => {
              setAllUsers(data);
            });
        } else {
          setAllUsers([]);
        }
      });
  }, []);

  useEffect(() => {
    setIsSearchHidden(true);
    setSearchInput('');
  }, [location]);

  const searchedUser = searchInput.length === 0 ? [] : allUsers.filter((user) => (user.name.toLowerCase().includes(searchInput.toLowerCase())) || (user.username.toLowerCase().includes(searchInput.toLowerCase())));

  return (
    <div>
      <div className="pt-2">
        <form className="flex justify-end mr-20">
          <label htmlFor="simple-search" className="sr-only">Search</label>
          <div className="relative">
            <div className="flex justify-end absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
            </div>
            <input
              type="text"
              id="simple-search"
              value={searchInput}
              onChange={handleOnChangeSearch}
              onFocus={() => {
                setIsSearchHidden(false);
              }}
              onBlur={(e: FocusEvent<HTMLInputElement>) => {
                if (!e.relatedTarget?.className.includes('searchItem')) {
                  setIsSearchHidden(true);
                }
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required
            />
          </div>
          <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <span className="sr-only">Search</span>
          </button>
        </form>
        <div className="flex justify-end">
          <div className={`${isSearchHidden ? 'hidden' : ''} absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
            <div className="py-1" role="none">
              {searchedUser.map((user) => (
                <Link to={`/profile/${user.id}`} key={user.id} className="text-gray-700 block px-4 py-2 text-sm searchItem">
                  {user.name}
                  {' '}
                  /
                  {' '}
                  {user.username}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
