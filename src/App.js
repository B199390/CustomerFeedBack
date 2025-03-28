

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import FeedbackForm from "./pages/FeedbackForm";
import MyFeedbacks from "./pages/MyFeedbacks";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import axios from "axios";
import { Spinner, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:5000/auth/user", { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/auth/logout", { withCredentials: true });
    } catch (error) {
      console.log("Logout failed", error);
    }
    setUser(null);
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Router>
      <Navbar user={user} setUser={setUser} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Home />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/feedback" element={user ? <FeedbackForm /> : <Navigate to="/" />} />
        <Route path="/my-feedbacks" element={user ? <MyFeedbacks /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
