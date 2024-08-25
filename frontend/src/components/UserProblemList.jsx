import React from 'react';
import { Link } from 'react-router-dom';
import { useProblems } from '../context/ProblemContext';
import Loader from './Loader';

const UserProblemList = () => {
  const { problems,loading } = useProblems();

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left font-mono text-primary-600 uppercase tracking-wider">
              List of Problems
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loading ? <><Loader/></>:problems.map((problem,idx) => (
            <tr key={problem._id}>
              <td className="px-6 py-4 whitespace-nowrap">

                <Link to={`/problems/${problem._id}`} className="text-primary-600 hover:text-primary-600/50">
                  <span className='mr-4'>{idx+1}</span>{problem.title}
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
