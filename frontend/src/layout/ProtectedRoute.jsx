import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";

export const ProtectedRoute = ({ children }) => {
  const { user } = useUser();
  const location=useLocation()
  useEffect(()=>{},[user])
  return user ? <Outlet /> : <Navigate to="/login" state={location.pathname}/>;
};
export const AdminProtectedRoute = ({ children }) => {
    const { user } = useUser();
    const location=useLocation()
    useEffect(()=>{},[user])
    return user?.role=="admin" ? <Outlet /> : <Navigate to="/" state={location.pathname}/>;
  };
