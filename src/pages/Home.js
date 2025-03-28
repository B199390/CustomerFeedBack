
import React, { useEffect, useState } from "react";
import { Container, Button, Spinner, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/auth/user", { withCredentials: true });
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 text-center" style={{ width: "25rem" }}>
        {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <>
            <h2>Welcome to Feedback Platform</h2>
            <p>Please log in to submit feedback.</p>
            <Button variant="danger" href="http://localhost:5000/auth/google">
              Login with Google
            </Button>
          </>
        )}
      </Card>
    </Container>
  );
};

export default Home;

