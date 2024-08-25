import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

const ProblemContext = createContext();

export const ProblemProvider = ({ children }) => {
  const [problems, setProblems] = useState([]);
  const [loading,setLoading]=useState(false)

  const fetchProblems = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get('/problems');
      setProblems(response.data.problems || response.data);
    } catch (error) {
      console.error('Error fetching problems:', error);
    }
    finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  return (
    <ProblemContext.Provider value={{ problems,loading, fetchProblems }}>
      {children}
    </ProblemContext.Provider>
  );
};

export const useProblems = () => useContext(ProblemContext);
