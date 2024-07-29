import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ProblemList from './components/ProblemList';
import ProblemForm from './components/ProblemForm';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import UserProblemList from './components/UserProblemList'; // Import the UserProblemList component
import ProblemDetail from './components/ProblemDetail';

function App() {
  const [isAdmin, setIsAdmin] = useState(true); // Set based on your authentication logic

  return (
    <BrowserRouter>
      <Navbar isAdmin={isAdmin} />
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/problems' element={<ProblemList />} />
        <Route path='/problems/:id' element={<ProblemDetail />} />
        {/* <Route path='/user-problems' element={<UserProblemList />} /> Route for user problems */}
        {isAdmin && <Route path="/problems/add" element={<ProblemForm />} />}
        {isAdmin && <Route path="/problems/edit/:id" element={<ProblemForm isEdit />} />}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
