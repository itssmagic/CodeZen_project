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
    constraints: '',
    examples: [{ input: '', expectedOutput: '' }],
    testCases: [{ input: '', expectedOutput: '' }]
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

  const handleExampleChange = (index, event) => {
    const newExamples = [...problem.examples];
    newExamples[index][event.target.name] = event.target.value;
    setProblem({ ...problem, examples: newExamples });
  };

  const addExample = () => {
    setProblem({
      ...problem,
      examples: [...problem.examples, { input: '', expectedOutput: '' }]
    });
  };

  const removeExample = (index) => {
    const newExamples = problem.examples.filter((_, i) => i !== index);
    setProblem({ ...problem, examples: newExamples });
  };

  const handleTestCaseChange = (index, event) => {
    const newTestCases = [...problem.testCases];
    newTestCases[index][event.target.name] = event.target.value;
    setProblem({ ...problem, testCases: newTestCases });
  };

  const addTestCase = () => {
    setProblem({
      ...problem,
      testCases: [...problem.testCases, { input: '', expectedOutput: '' }]
    });
  };

  const removeTestCase = (index) => {
    const newTestCases = problem.testCases.filter((_, i) => i !== index);
    setProblem({ ...problem, testCases: newTestCases });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      if (id) {
        
        await axiosInstance.put(`/problems/${id}`, problem);
      } else {
        console.log(problem);
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
        <div>
          <label className="block font-medium">Examples</label>
          {problem.examples.map((example, index) => (
            <div key={index} className="space-y-2 mb-4">
              <div>
                <label className="block font-medium">Input</label>
                <input
                  type="text"
                  name="input"
                  value={example.input}
                  onChange={(e) => handleExampleChange(index, e)}
                  required
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block font-medium">Expected Output</label>
                <input
                  type="text"
                  name="expectedOutput"
                  value={example.expectedOutput}
                  onChange={(e) => handleExampleChange(index, e)}
                  required
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <button
                type="button"
                onClick={() => removeExample(index)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove Example
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addExample}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Example
          </button>
        </div>
        <div>
          <label className="block font-medium">Test Cases</label>
          {problem.testCases.map((testCase, index) => (
            <div key={index} className="space-y-2 mb-4">
              <div>
                <label className="block font-medium">Input</label>
                <input
                  type="text"
                  name="input"
                  value={testCase.input}
                  onChange={(e) => handleTestCaseChange(index, e)}
                  required
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block font-medium">Expected Output</label>
                <input
                  type="text"
                  name="expectedOutput"
                  value={testCase.expectedOutput}
                  onChange={(e) => handleTestCaseChange(index, e)}
                  required
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <button
                type="button"
                onClick={() => removeTestCase(index)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove Test Case
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addTestCase}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Test Case
          </button>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  );
};

export default ProblemForm;
