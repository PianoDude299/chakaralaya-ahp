// src/components/CriteriaForm.js

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  IconButton,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

const CriteriaForm = () => {
  const location = useLocation();
  const { criteriaCount } = location.state;
  const [criteria, setCriteria] = useState([]);

  useEffect(() => {
    const initialCriteria = Array.from({ length: criteriaCount }, () => ({ name: '', description: '', image: null }));
    setCriteria(initialCriteria);
  }, [criteriaCount]);

  const handleInputChange = (index, event) => {
    const { name, value, files } = event.target;
    const newCriteria = [...criteria];
    newCriteria[index][name] = files ? files[0] : value;
    setCriteria(newCriteria);
  };

  const moveUp = (index) => {
    if (index > 0) {
      const newCriteria = [...criteria];
      [newCriteria[index - 1], newCriteria[index]] = [newCriteria[index], newCriteria[index - 1]];
      setCriteria(newCriteria);
    }
  };

  const moveDown = (index) => {
    if (index < criteria.length - 1) {
      const newCriteria = [...criteria];
      [newCriteria[index + 1], newCriteria[index]] = [newCriteria[index], newCriteria[index + 1]];
      setCriteria(newCriteria);
    }
  };

  const moveToTop = (index) => {
    if (index > 0) {
      const newCriteria = [...criteria];
      const [item] = newCriteria.splice(index, 1);
      newCriteria.unshift(item);
      setCriteria(newCriteria);
    }
  };

  const moveToBottom = (index) => {
    if (index < criteria.length - 1) {
      const newCriteria = [...criteria];
      const [item] = newCriteria.splice(index, 1);
      newCriteria.push(item);
      setCriteria(newCriteria);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just log the criteria to the console
    console.log(JSON.stringify(criteria, null, 2));
    // Here you would send the data to the backend
    // fetch('/api/submit', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(criteria),
    // });
  };

  return (
    <Container maxWidth="md">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Enter Criteria Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {criteria.map((criterion, index) => (
              <Grid item xs={12} key={index}>
                <Card>
                  <CardContent>
                    <TextField
                      label={`Criteria ${index + 1} Name`}
                      name="name"
                      value={criterion.name}
                      onChange={(e) => handleInputChange(index, e)}
                      fullWidth
                      required
                    />
                    <TextField
                      label="Description (optional)"
                      name="description"
                      value={criterion.description}
                      onChange={(e) => handleInputChange(index, e)}
                      fullWidth
                      multiline
                      rows={2}
                      style={{ marginTop: '10px' }}
                    />
                    <input
                      accept="image/*"
                      type="file"
                      name="image"
                      onChange={(e) => handleInputChange(index, e)}
                      style={{ marginTop: '10px' }}
                    />
                  </CardContent>
                  <CardActions>
                    <IconButton onClick={() => moveUp(index)}>
                      <ArrowUpward />
                    </IconButton>
                    <IconButton onClick={() => moveDown(index)}>
                      <ArrowDownward />
                    </IconButton>
                    <Button onClick={() => moveToTop(index)}>Move to top</Button>
                    <Button onClick={() => moveToBottom(index)}>Move to bottom</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CriteriaForm;
