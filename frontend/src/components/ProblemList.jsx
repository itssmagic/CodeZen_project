import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Link } from 'react-router-dom';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import Loader from './Loader';

const ProblemList = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [problemToDelete, setProblemToDelete] = useState(null);

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
  }, [isModalOpen]);

  const handleDelete = async () => {
    if (!problemToDelete) return;

    try {
      await axiosInstance.delete(`/problems/${problemToDelete}`);
      setProblems(problems.filter(problem => problem._id !== problemToDelete));
      setProblemToDelete(null);
      setIsModalOpen(false);
    } catch (error) {
      setError('Error deleting problem');
    }
  };

  const openModal = (id) => {
    setProblemToDelete(id);
    setIsModalOpen(true);
  };

  if (loading) return <Loader/>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      {/* <h1 className="text-2xl font-bold mb-4">Problem List</h1>
      <Link to="/problems/add" className="bg-blue-500 text-white px-4 py-2 rounded">Add New Problem</Link> */}
      {/* <ul className="mt-4">
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
                onClick={() => openModal(problem._id)} 
                className="bg-red-500 text-white px-2 py-1 rounded">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul> */}
      <ProblemListTable tableItems={problems} openModal={openModal}/>
      <DeleteConfirmationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleDelete} 
      />
    </div>
  );
};

export default ProblemList;
const ProblemListTable=({tableItems,openModal}) => {

  return (
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="items-start justify-between md:flex">
              <div className="max-w-lg md:max-w-3xl">
                  <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                      Manage Problems
                  </h3>
                  <p className="text-gray-600 mt-2">
                  Contribute to our coding community by adding a new problem. Share your challenging algorithms, data structures, or any unique problem-solving tasks that will help others enhance their coding skills. 
                  </p>
              </div>
              <div className="mt-3 md:mt-0">
                  <a
                      href="javascript:void(0)"
                      className="inline-block px-4 py-2 text-white duration-150 font-medium bg-primary-400 rounded-lg hover:bg-primary-500 active:bg-primary-700 md:text-sm"
                  >
                      Add Problem
                  </a>
              </div>
          </div>
          <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
              <table className="w-full table-auto text-sm text-left">
                  <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                      <tr>
                          <th className="py-3 px-6">Problem Id</th>
                          <th className="py-3 px-6">Problem Name</th>
                          <th className="py-3 px-6">Status</th>
                          <th className="py-3 px-6 text-center">Action</th>

                      </tr>
                  </thead>
                  <tbody className="text-gray-600 divide-y">
                      {tableItems && 
                          tableItems.map((item, idx) => (
                              <tr key={idx}>
                                  <td className="px-6 py-4 whitespace-nowrap">{item._id}</td>
                                  <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-2 rounded-full font-semibold text-xs ${item?.status ?? "Active" == "Active" ? "text-green-600 bg-green-50" : "text-blue-600 bg-blue-50"}`}>
                                            {item?.status ?? "Active"}
                                    </span>
                                  </td>
                                  <td className="text-right px-6 space-x-2 whitespace-nowrap">
                                      <Link to={`/problems/edit/${item?._id}`}  className="py-2 px-3 font-medium text-primary-600 bg-primary-50 hover:text-primary-500 duration-150 hover:bg-gray-50 rounded-lg">
                                          Edit
                                      </Link>
                                      <button onClick={(e) => openModal(item?._id)}  className="py-2 leading-none px-3 font-medium bg-red-50 text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
                                          Delete
                                      </button>
                                  </td>
                              </tr>
                          ))
                      }
                  </tbody>
              </table>
          </div>
      </div>
  )
}