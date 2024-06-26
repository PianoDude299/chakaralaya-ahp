// src/components/Home.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Typography, Box } from '@mui/material';

const Home = () => {
  const [criteriaCount, setCriteriaCount] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (criteriaCount > 0) {
      navigate('/criteria', { state: { criteriaCount: parseInt(criteriaCount) } });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h3">Chakaralaya Analytics</Typography>
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <TextField
            label="Enter number of criteria"
            type="number"
            value={criteriaCount}
            onChange={(e) => setCriteriaCount(e.target.value)}
            fullWidth
            required
          />
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Home;
