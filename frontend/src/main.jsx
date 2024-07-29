import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ProblemProvider } from './context/ProblemContext'; // Import the ProblemProvider
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProblemProvider> {/* Wrap the App component with ProblemProvider */}
      <App />
    </ProblemProvider>
  </React.StrictMode>
);

