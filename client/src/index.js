import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import UserContextProvider from './context/user.context.js';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </UserContextProvider>
  </React.StrictMode>
);

