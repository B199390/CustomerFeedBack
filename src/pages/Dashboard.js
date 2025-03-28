

import React, { useState } from "react";
import { Container, TextField, Button, Typography, Card, Alert, Snackbar, MenuItem } from "@mui/material";
import axios from "axios";

const categories = ["Product Features", "Product Pricing", "Product Usability"];

const Dashboard = () => {
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [comments, setComments] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category || !rating || !comments) {
      setError("Fill all fields");
      return;
    }

    if (rating < 1 || rating > 5) {
      setError("Rating must be between 1 and 5");
      return;
    }

    try {
      const feedbackData = { category, rating, comments };
      await axios.post("http://localhost:5000/feedback/submit", feedbackData, { withCredentials: true });

      setSuccess(true);
      setCategory("");
      setRating("");
      setComments("");
      setError("");
    } catch {
      setError("Error submitting feedback");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" color="primary">
        Submit Feedback
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}
      <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>
        <Alert severity="success">Feedback submitted!</Alert>
      </Snackbar>

      <Card sx={{ padding: 3 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            select
            label="Category"
            fullWidth
            margin="normal"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Rating (1-5)"
            type="number"
            fullWidth
            margin="normal"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            
          />

          <TextField
            label="Comments"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default Dashboard;

