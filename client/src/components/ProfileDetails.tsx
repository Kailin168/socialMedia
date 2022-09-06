import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

export default function ProfileDetails() {
  const params = useParams();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('/profile/')) {
      //do regex for pathname
      fetch(`/user_info/${params.userId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log('user', data);
        });
    }
  }, [location.pathname]);

  return (
    <div>
      profile info

      {/* <button>follow</button>
      <button>unfollow</button> */}
    </div>
  );
}
