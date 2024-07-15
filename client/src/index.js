import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import UserContextProvider from './context/user.context.js';
import ErrorBoundary from './ErrorBoundary.jsx';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
    <BrowserRouter>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
    </BrowserRouter>
    </UserContextProvider>
  </React.StrictMode>
);

