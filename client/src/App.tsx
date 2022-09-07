import React, { useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import SignIn from './Pages/SignIn';
import CreateAccount from './Pages/CreateAccount';
import NotFound from './Pages/NotFound';
import LoggedInPageLayout from './Pages/LoggedInPageLayout';
import Notifications from './components/Notification';
import Likes from './components/Likes';
import Setting from './components/Setting';
import ProfileDetails from './components/ProfileDetails';

import { ProtectedRoute } from './utils/PrivateRoute';
import { AuthContext } from './contexts/contexts';

import './App.css';
import './styles.css';

function App() {
  const { handleLogin, handleLogout, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    fetch('/me')
      .then((res) => {
        if (res.ok) {
          res.json()
            .then((data) => {
              handleLogin(data);
              // navigate('/home');
            });
        } else if (res.status !== 500 && res.status !== 404) {
          handleLogout();
        }
      });
  }, []);

  if (isLoggedIn) {
    return (
      <LoggedInPageLayout>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
          <Route path="/likes" element={<ProtectedRoute><Likes /></ProtectedRoute>} />
          <Route path="/setting" element={<ProtectedRoute><Setting /></ProtectedRoute>} />
          <Route path="/profile/:userId" element={<ProtectedRoute><ProfileDetails /></ProtectedRoute>} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/createAccount" element={<CreateAccount />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LoggedInPageLayout>
    );
  }
  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/createAccount" element={<CreateAccount />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
