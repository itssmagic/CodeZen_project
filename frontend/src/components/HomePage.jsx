import React from 'react';
import UserProblemList from './UserProblemList';

const HomePage = () => {
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Problems to Attempt</h1>
      <UserProblemList />
    </div>
  );
};

export default HomePage;
