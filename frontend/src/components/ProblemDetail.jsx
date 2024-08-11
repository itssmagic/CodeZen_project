import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance.js';
import { useUser } from '../context/UserContext.jsx'; // Import the useUser hook

function ProblemDetail() {
  const { id } = useParams();
  // const { user } = useUser(); // Get user from context
  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState('cpp');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [code, setCode] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Fetch the problem details from the database
    axiosInstance.get(`/problems/${id}`)
      .then(response => setProblem(response.data))
      .catch(error => console.error('Error fetching problem:', error));
  }, [id]);

  const handleRun = () => {
    // Run the code using the online compiler API
    axiosInstance.post('/compile', { code, input, language })
      .then(response => setOutput(response.data.output))
      .catch(error => console.error('Error running code:', error));
  };

  const handleSubmit = () => {
    // if (!user) {
    //   setStatus('User not logged in');
    //   return;
    // }

    // Submit the code for evaluation
    axiosInstance.post('/submit', { problemId: id, code, language })
      .then(response => {
        setOutput(response.data.output);
        setStatus(response.data.status);
      })
      .catch(error => {
        setStatus('Error submitting code');
        console.error('Error submitting code:', error);
      });
  };

  if (!problem) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row p-4">
      <div className="md:w-1/2 mb-4 md:mb-0 md:pr-4">
        <h2 className="text-2xl font-bold mb-2">{problem.title}</h2>
        <p className="mb-4">{problem.description}</p>
        <h3 className="text-xl font-bold mb-2">Input Format</h3>
        <p className="mb-4">{problem.inputFormat}</p>
        <h3 className="text-xl font-bold mb-2">Output Format</h3>
        <p className="mb-4">{problem.outputFormat}</p>
        <h3 className="text-xl font-bold mb-2">Constraints</h3>
        <p className="mb-4">{problem.constraints}</p>
      </div>
      <div className="md:w-1/2 flex flex-col space-y-4">
        <div>
          <label htmlFor="language" className="block mb-2 font-medium">Language:</label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          >
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="python">Python</option>
          </select>
        </div>
        <div>
          <textarea
            placeholder="Write your code here"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={10}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div>
          <textarea
            placeholder="Input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div>
          <textarea
            placeholder="Output"
            value={output}
            readOnly
            rows={3}
            className="w-full border border-gray-300 rounded p-2 bg-gray-100"
          />
        </div>
        <div>
          {status && (
            <p className={`font-semibold ${status === 'Accepted' ? 'text-green-600' : status === 'Wrong Answer' ? 'text-red-600' : 'text-gray-600'}`}>
              Status: {status}
            </p>
          )}
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleRun}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Run
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProblemDetail;
