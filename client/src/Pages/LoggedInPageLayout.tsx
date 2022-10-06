import React from 'react';

import Leftsidebar from '../components/Leftsidebar';
import Navbar from '../components/Navbar';
import Rightsidebar from '../components/Rightsidebar';

interface Props {
  children: JSX.Element;
}
export default function LoggedInPageLayout({ children } : Props) {
  return (
    <div className="w-screen">
      <Navbar />
      <div className="flex justify-center w-full px-10">
        <div className="w-1/6 ml-5 mt-5 mr-5">
          <Leftsidebar />
        </div>
        <div className="h-screen w-4/6 mt-5 mr-1 ml-1 overflow-auto relative flex flex-col items-center">
          {children}
        </div>
        <div className="w-1/6 mt-5 ml-5 ">
          <Rightsidebar />
        </div>
      </div>
    </div>
  );
}
