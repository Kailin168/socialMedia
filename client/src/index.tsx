import ReactDOM from 'react-dom/client';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import actionCable from 'actioncable';

import AuthProvider from './contexts/AuthContext';
import './index.css';
import App from './App';
import { ActionCableContext } from './contexts/contexts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
// eslint-disable-next-line react/jsx-no-constructed-context-values
const CableApp = { cable: actionCable.createConsumer(`ws://${window.location.hostname}:3000/cable`) };
// CableApp.cable = actionCable.createConsumer('ws://localhost:3000/cable');

// const CableApp = {};
// CableApp.cable = actionCable.createConsumer('ws://localhost:3000/cable');
// export const ActionCableContext = createContext<unknown>(defaultValue: unknown);

console.log(CableApp);

root.render(
  <BrowserRouter>
    <AuthProvider>
      <ActionCableContext.Provider value={CableApp}>
        <App />
      </ActionCableContext.Provider>
    </AuthProvider>
  </BrowserRouter>,
);
