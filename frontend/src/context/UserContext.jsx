// UserContext.js
import React, { createContext, useState, useContext } from 'react';
import axiosInstance from '../api/axiosInstance';

// Create the context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Mock login function to set user details
  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await axiosInstance.get("/logout")
      setUser(null)
    } catch (error) {
      
    }
    
  };

  const getUser=async ()=>{
    const {data}=await axiosInstance.get("/me")
    console.log(data)
    setUser(data)
  }

  return (
    <UserContext.Provider value={{ user,setUser,getUser,logout, login }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
