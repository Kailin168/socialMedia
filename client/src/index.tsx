import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import actionCable from 'actioncable';

import AuthProvider from './contexts/AuthContext';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
const CableApp = {};
CableApp.cable = actionCable.createConsumer('ws://localhost:3000/cable');

root.render(
  <BrowserRouter>
    <AuthProvider>
      <App cable={CableApp.cable} />
    </AuthProvider>
  </BrowserRouter>,
);
