import React, { useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import SignIn from './Pages/SignIn';
import CreateAccount from './Pages/CreateAccount';
import NotFound from './Pages/NotFound';
import LoggedInPageLayout from './Pages/LoggedInPageLayout';
import Chat from './components/Chat';
import Likes from './components/Likes';
import Setting from './components/Setting';
import ProfileDetails from './components/ProfileDetails';

import { ProtectedRoute } from './utils/PrivateRoute';
import { AuthContext } from './contexts/contexts';
import DiscoverProvider from './contexts/DiscoverContext';

import './App.css';
import './styles.css';
import Chatroom from './components/Chatroom';

function App() {
  const { fetchUser, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    fetchUser();
  }, []);

  if (isLoggedIn) {
    return (
      <DiscoverProvider>
        <LoggedInPageLayout>
          <Routes>
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/chat/" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
            <Route path="/chatroom/:userId" element={<ProtectedRoute><Chatroom /></ProtectedRoute>} />
            <Route path="/likes" element={<ProtectedRoute><Likes /></ProtectedRoute>} />
            <Route path="/setting" element={<ProtectedRoute><Setting /></ProtectedRoute>} />
            <Route path="/profile/:userId" element={<ProtectedRoute><ProfileDetails /></ProtectedRoute>} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/createAccount" element={<CreateAccount />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </LoggedInPageLayout>
      </DiscoverProvider>
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
