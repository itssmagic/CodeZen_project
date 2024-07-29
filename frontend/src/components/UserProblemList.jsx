import React from 'react';
import { Link } from 'react-router-dom';
import { useProblems } from '../context/ProblemContext';

const UserProblemList = () => {
  const { problems } = useProblems();

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              List of Problems
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {problems.map((problem) => (
            <tr key={problem._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <Link to={`/problems/${problem._id}`} className="text-blue-600 hover:text-blue-800">
                  {problem.title}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserProblemList;
