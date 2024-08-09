// src/components/ProblemList.jsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Link } from 'react-router-dom';

const ProblemList = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axiosInstance.get('/problems');
        setProblems(response.data);
      } catch (error) {
        setError('Error fetching problems');
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/problems/${id}`);
      setProblems(problems.filter(problem => problem._id !== id));
    } catch (error) {
      setError('Error deleting problem');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Problem List</h1>
      <Link to="/problems/add" className="bg-blue-500 text-white px-4 py-2 rounded">Add New Problem</Link>
      <ul className="mt-4">
        {problems.map(problem => (
          <li key={problem._id} className="border-b py-2 flex justify-between items-center">
            <Link to={`/problems/${problem._id}`} className="text-blue-600">{problem.title}</Link>
            <div>
              <Link 
                to={`/problems/edit/${problem._id}`} 
                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                Edit
              </Link>
              <button 
                onClick={() => handleDelete(problem._id)} 
                className="bg-red-500 text-white px-2 py-1 rounded">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProblemList;