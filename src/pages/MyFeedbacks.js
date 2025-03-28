

import React, { useEffect, useState } from "react";
import { Container, Card, Spinner, Alert, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

const MyFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/feedback/all-feedbacks");
      setFeedbacks(res.data.feedbacks || []);
    } catch {
      setError("Failed to load feedbacks.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this feedback?")) return;
    try {
      await axios.delete(`http://localhost:5000/feedback/delete/${id}`);
      setFeedbacks(feedbacks.filter(f => f._id !== id));
    } catch {
      alert("Error deleting feedback.");
    }
  };

  const handleEdit = (feedback) => {
    setCurrentFeedback(feedback);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/feedback/edit/${currentFeedback._id}`, currentFeedback);
      setFeedbacks(feedbacks.map(f => f._id === currentFeedback._id ? currentFeedback : f));
      setShowModal(false);
      setCurrentFeedback(null);
    } catch {
      alert("Error updating feedback.");
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center">All Feedbacks</h2>

      {loading ? (
        <Spinner className="d-block mx-auto" animation="border" />
      ) : error ? (
        <Alert variant="danger" className="text-center">{error}</Alert>
      ) : feedbacks.length === 0 ? (
        <Alert variant="info" className="text-center">No feedbacks available.</Alert>
      ) : (
        feedbacks.map(feedback => (
          <Card key={feedback._id} className="mb-3 p-3">
            <h5>{feedback.category}</h5>
            <p>Rating: {feedback.rating}</p>
            <p>{feedback.comments}</p>
            <Button variant="warning" onClick={() => handleEdit(feedback)}>Edit</Button>
            <Button variant="danger" className="ms-2" onClick={() => handleDelete(feedback._id)}>Delete</Button>
          </Card>
        ))
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentFeedback && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  value={currentFeedback.category}
                  onChange={(e) => setCurrentFeedback({ ...currentFeedback, category: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  type="number"
                  value={currentFeedback.rating}
                  onChange={(e) => setCurrentFeedback({ ...currentFeedback, rating: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Comments</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={currentFeedback.comments}
                  onChange={(e) => setCurrentFeedback({ ...currentFeedback, comments: e.target.value })}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MyFeedbacks;

