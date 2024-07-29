import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

const ProblemContext = createContext();

export const ProblemProvider = ({ children }) => {
  const [problems, setProblems] = useState([]);

  const fetchProblems = async () => {
    try {
      const response = await axiosInstance.get('/problems');
      setProblems(response.data.problems || response.data);
    } catch (error) {
      console.error('Error fetching problems:', error);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  return (
    <ProblemContext.Provider value={{ problems, fetchProblems }}>
      {children}
    </ProblemContext.Provider>
  );
};

export const useProblems = () => useContext(ProblemContext);
