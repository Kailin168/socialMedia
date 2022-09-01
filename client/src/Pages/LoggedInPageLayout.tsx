import React from 'react';

import Leftsidebar from '../components/Leftsidebar';
import Navbar from '../components/Navbar';
import Rightsidebar from '../components/Rightsidebar';

interface Props {
  children: JSX.Element;
}
export default function LoggedInPageLayout({ children } : Props) {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="items-start;">
          <Leftsidebar />
        </div>
        <div className="flex-none w-64 items-center;">
          {children}
        </div>
        <div className="items-end;">
          <Rightsidebar />
        </div>
      </div>
    </div>
  );
}
