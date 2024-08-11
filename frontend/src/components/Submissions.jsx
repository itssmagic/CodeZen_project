import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import axiosInstance from '../api/axiosInstance';

const SubmissionsPage = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    // Fetch submissions from the API
    const fetchSubmissions = async () => {
      try {
        const response = await axiosInstance.get('/submissions');
        setSubmissions(response.data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Submissions</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              {/* <th className="py-3 px-4 text-left text-gray-700 font-semibold">Username</th> */}
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">Problem Title</th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">User</th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">Language</th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">Submission Time</th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission, index) => (
              <tr key={submission._id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
              
                {/* <td className="py-3 px-4">{submission.userId.username}</td> */}
                <td className="py-3 px-4 text-gray-800">{submission?.problemId?.title}</td>
                <td className="py-3 px-4 text-gray-800">{submission?.userId?.username}</td>
                <td className="py-3 px-4 text-gray-800">{submission?.language}</td>
                <td className="py-3 px-4 text-gray-800">{new Date(submission.createdAt).toLocaleString()}</td>
                <td className={`py-3 px-4 font-semibold ${submission.status === 'Accepted' ? 'text-green-600' : 'text-red-600'}`}>
                  {submission.status}
                </td>
              
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubmissionsPage;
