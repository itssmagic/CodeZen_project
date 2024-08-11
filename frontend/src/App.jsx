import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import ProblemList from "./components/ProblemList";
import ProblemForm from "./components/ProblemForm";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import UserProblemList from "./components/UserProblemList"; // Import the UserProblemList component
import ProblemDetail from "./components/ProblemDetail";
import { UserProvider, useUser } from "./context/UserContext";
import { AdminProtectedRoute, ProtectedRoute } from "./layout/ProtectedRoute";
import Submissions from "./components/Submissions";

function App() {
  const { user, getUser } = useUser();

  const [isAdmin, setIsAdmin] = useState(true); // Set based on your authentication logic
  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);
  return (
    <BrowserRouter>
      <Navbar isAdmin={isAdmin} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<HomePage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/problems/:id" element={<ProblemDetail />} />
          <Route path="/user-problems" element={<UserProblemList />} />
          <Route path="/submissions" element={<Submissions />} />
          {/* {isAdmin && <Route path="/problems/add" element={<ProblemForm />} />}
          
          {isAdmin && <Route path="/problems/edit/:id" element={<ProblemForm isEdit />} />} */}
          <Route element={<AdminProtectedRoute />}>
            <Route path="/problems" element={<ProblemList />} />
            <Route path="/problems/add" element={<ProblemForm />} />
            <Route path="/problems/edit/:id" element={<ProblemForm isEdit />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
