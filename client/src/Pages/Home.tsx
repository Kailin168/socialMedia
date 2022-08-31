import React from 'react';

import Feed from '../components/Feed';
import Leftsidebar from '../components/Leftsidebar';
import Navbar from '../components/Navbar';
import Rightsidebar from '../components/Rightsidebar';

export default function Home() {
  return (
    <div>
      <Feed />
      <Navbar />
      <Leftsidebar />
      <Rightsidebar />
    </div>
  );
}
