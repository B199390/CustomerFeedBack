
import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";

const FeedbackForm = ({ user }) => {
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category || !rating || !feedback) {
      setMessage("Please fill in all fields.");
      return;
    }
    if (rating < 1 || rating > 5) {
      setMessage("Rating must be between 1 and 5.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/feedback/submit", {
        category,
        rating,
        comments: feedback,
        user: user ? { displayName: user.displayName, email: user.email } : null,
      });
      setMessage("Feedback submitted successfully!");
      setCategory(""); setRating(""); setFeedback("");
    } catch (error) {
      setMessage("Error submitting feedback. Please try again.");
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Provide Your Feedback</h2>
      {message && <Alert variant="danger">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select Category</option>
            <option value="Product Features">Product Features</option>
            <option value="Product Pricing">Product Pricing</option>
            <option value="Product Usability">Product Usability</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Rating (1-5)</Form.Label>
          <Form.Control
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Feedback</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="w-100">
          Submit Feedback
        </Button>
      </Form>
    </Container>
  );
};

export default FeedbackForm;
