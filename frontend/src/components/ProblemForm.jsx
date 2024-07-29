import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { useProblems } from '../context/ProblemContext';

const ProblemForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchProblems } = useProblems();
  const [problem, setProblem] = useState({
    title: '',
    description: '',
    inputFormat: '',
    outputFormat: '',
    constraints: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchProblem = async () => {
        try {
          const response = await axiosInstance.get(`/problems/${id}`);
          setProblem(response.data);
        } catch (error) {
          setError('Error fetching problem');
        } finally {
          setLoading(false);
        }
      };

      fetchProblem();
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleChange = (e) => {
    setProblem({
      ...problem,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axiosInstance.put(`/problems/${id}`, problem);
      } else {
        await axiosInstance.post('/problems', problem);
      }
      await fetchProblems(); // Refresh the problem list in context
      navigate('/problems');
    } catch (error) {
      setError('Error saving problem');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{id ? 'Edit Problem' : 'Add New Problem'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input 
            type="text" 
            name="title" 
            value={problem.title} 
            onChange={handleChange} 
            required 
            className="w-full px-4 py-2 border rounded" 
          />
        </div>
        <div>
          <label className="block font-medium">Description</label>
          <textarea 
            name="description" 
            value={problem.description} 
            onChange={handleChange} 
            required 
            className="w-full px-4 py-2 border rounded" 
          />
        </div>
        <div>
          <label className="block font-medium">Input Format</label>
          <textarea 
            name="inputFormat" 
            value={problem.inputFormat} 
            onChange={handleChange} 
            required 
            className="w-full px-4 py-2 border rounded" 
          />
        </div>
        <div>
          <label className="block font-medium">Output Format</label>
          <textarea 
            name="outputFormat" 
            value={problem.outputFormat} 
            onChange={handleChange} 
            required 
            className="w-full px-4 py-2 border rounded" 
          />
        </div>
        <div>
          <label className="block font-medium">Constraints</label>
          <textarea 
            name="constraints" 
            value={problem.constraints} 
            onChange={handleChange} 
            required 
            className="w-full px-4 py-2 border rounded" 
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  );
};

export default ProblemForm;
