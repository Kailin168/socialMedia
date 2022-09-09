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
        <div className="flex-initial w-1/5 ml-10 mt-5 border-solid border-4 border-sky-500 rounded-lg">
          <Leftsidebar />
        </div>
        <div className="flex-none h-screen w-3/5 flex justify-center mt-5 mr-10 ml-10 overflow-auto border-solid border-4 border-sky-500 rounded-lg">
          {children}
        </div>
        <div className="flex-initial w-1/5 mr-10 mt-5 border-solid border-4 border-sky-500 rounded-lg">
          <Rightsidebar />
        </div>
      </div>
    </div>
  );
}
