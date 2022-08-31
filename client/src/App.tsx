import React, { useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import SignIn from './Pages/SignIn';
import CreateAccount from './Pages/CreateAccount';
import NotFound from './Pages/NotFound';

import { ProtectedRoute } from './utils/PrivateRoute';
import AuthProvider from './contexts/AuthContext';
import { AuthContext } from './contexts/contexts';

import './App.css';
import './styles.css';

function App() {
  const auth = useContext(AuthContext);

  useEffect(() => {
    fetch('/me')
      .then((res) => {
        if (res.ok) {
          res.json()
            .then((data) => {
              auth.setUser(data);
              // navigate('/home');
            });
        }
      });
  }, []);

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/createAccount" element={<CreateAccount />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* <Footer /> */}

    </AuthProvider>
  );
}

export default App;
