import React from 'react';
import Register from './components/Register';
// import Navbar from './components/Navbar';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProblemList from './components/ProblemList';
import ProblemForm from './components/ProblemForm';

import HomePage from './components/HomePage';


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/' element={<HomePage />}></Route>
          { <Route path="/problems" element={<ProblemList />} /> }
           <Route path="/problems/add" element={<ProblemForm />} />
          { <Route path="/problems/edit/:id" element={<ProblemForm isEdit />} />  }
        </Routes >
      </BrowserRouter >
      {/* <ProblemForm/> */}

      {/* <ProblemList/> */}
    </>
  )
}

export default App
