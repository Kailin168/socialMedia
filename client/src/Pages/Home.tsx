import React from 'react';

import Feed from '../components/Feed';
// import Leftsidebar from '../components/Leftsidebar';
// import Navbar from '../components/Navbar';
// import Rightsidebar from '../components/Rightsidebar';
import Post from '../components/Post';

export default function Home() {
  return (
    <div>
      <Post />
      <Feed />
    </div>
  );
}
