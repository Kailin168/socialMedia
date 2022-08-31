import React from 'react';

import Feed from '../components/Feed';
import Leftsidebar from '../components/Leftsidebar';
import Navbar from '../components/Navbar';
import Rightsidebar from '../components/Rightsidebar';

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="items-start;">
          <Leftsidebar />
        </div>
        <div className="flex-none w-64 items-center;">
          <Feed />
        </div>
        <div className="items-end;">
          <Rightsidebar />
        </div>
      </div>
    </div>
  );
}
