
import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CustomNavbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.get("http://localhost:5000/auth/logout", { withCredentials: true });
      localStorage.removeItem("user");
      setUser(null);
      navigate("/");
    } catch {
      alert("Logout failed");
    }
    setLoading(false);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          Feedback Platform
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user && (
              <NavDropdown title="Account" id="user-dropdown" align="end">
                <NavDropdown.Item onClick={() => navigate("/my-feedbacks")}>
                  My Feedbacks
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} className="text-danger">
                  {loading ? "Logging out..." : "Logout"}
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
