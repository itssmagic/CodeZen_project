// src/components/ProblemListContainer.jsx
import React, { useState } from 'react';
import ProblemList from './ProblemList';
import ProblemForm from './ProblemForm';
import axios from 'axios';
import { Container, Button } from '@mui/material';

const ProblemListContainer = () => {
  const [editingProblem, setEditingProblem] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleEdit = (problem) => {
    setEditingProblem(problem);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/problems/${id}`)
      .then(() => {
        setRefresh(!refresh); // Refresh the list after deletion
      })
      .catch(error => {
        console.error("There was an error deleting the problem!", error);
      });
  };

  const handleSave = () => {
    setEditingProblem(null);
    setRefresh(!refresh); // Refresh the list after save
  };

  return (
    <Container>
      <Button variant="contained" color="primary" onClick={() => setEditingProblem({})}>
        Add Problem
      </Button>
      <ProblemList onEdit={handleEdit} onDelete={handleDelete} key={refresh} />
      {editingProblem && <ProblemForm problem={editingProblem} onSave={handleSave} />}
    </Container>
  );
};

export default ProblemListContainer;
