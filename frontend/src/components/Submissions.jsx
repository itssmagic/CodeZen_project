import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import axiosInstance from '../api/axiosInstance';
import Loader from './Loader';

const SubmissionsPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading,setLoading]=useState(false)
  useEffect(() => {
    // Fetch submissions from the API
    const fetchSubmissions = async () => {
      try {
        setLoading(true)
        const response = await axiosInstance.get('/submissions');
        setSubmissions(response.data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }finally{
        setLoading(false)
      }
    };

    fetchSubmissions();
  }, []);

  if(loading)
  {
    return <Loader/>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Submissions</h1>
      <div className="overflow-x-auto">
        <SubmissionTable tableItems={submissions}/>
      </div>
    </div>
  );
};

const SubmissionTable=({tableItems}) => {
  return (
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
         
          <div className="shadow-sm border rounded-lg overflow-x-auto">
              <table className="w-full table-auto text-sm text-left">
                  <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                      <tr>
                          <th className="py-3 px-6">Problem Title</th>
                          <th className="py-3 px-6">User</th>
                          <th className="py-3 px-6">Language</th>
                          <th className="py-3 px-6">Submission Time</th>
                          <th className="py-3 px-6">Status</th>
                          {/* <th className="py-3 px-6 text-center"></th> */}

                      </tr>
                  </thead>
                  <tbody className="text-gray-600 divide-y">
                      {tableItems && 
                          tableItems.map((item, idx) => (
                              <tr key={idx}>
                                  <td className="px-6 py-4 whitespace-nowrap">{item.problemId?.title ?? 'Unknown'}</td>
                                  <td className="px-6 py-4 whitespace-nowrap">{item?.userId?.username ?? "Unknown"}</td>
                                  <td className="px-6 py-4 whitespace-nowrap">{item?.language ?? "Unknown"}</td>

                                  <td className="px-6 py-4 whitespace-nowrap">{new Date(item?.createdAt).toLocaleString()}</td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-2 rounded-full font-semibold text-xs ${item?.status ?? "Active" == "Active" ? "text-green-600 bg-green-50" : "text-blue-600 bg-blue-50"}`}>
                                            {item?.status ?? "Active"}
                                    </span>
                                  </td>
                                  {/* <td className="text-right px-6 space-x-2 whitespace-nowrap">
                                      <Link to={`/problems/edit/${item?._id}`}  className="py-2 px-3 font-medium text-primary-600 bg-primary-50 hover:text-primary-500 duration-150 hover:bg-gray-50 rounded-lg">
                                          View
                                      </Link>
                                      <button onClick={(e) => openModal(item?._id)}  className="py-2 leading-none px-3 font-medium bg-red-50 text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
                                          Report Plagirism
                                      </button>
                                  </td> */}
                              </tr>
                          ))
                      }
                  </tbody>
              </table>
          </div>
      </div>
  )
}

export default SubmissionsPage;
