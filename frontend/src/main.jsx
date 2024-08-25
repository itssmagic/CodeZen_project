import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserProvider } from './context/UserContext'; // Import UserProvider
import { ProblemProvider } from './context/ProblemContext'; // Import ProblemProvider
import './index.css';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider> {/* Wrap the App component with UserProvider */}
      <ProblemProvider> {/* Wrap the App component with ProblemProvider */}
        <App />
        <Toaster />
      </ProblemProvider>
    </UserProvider>
  </React.StrictMode>
);
