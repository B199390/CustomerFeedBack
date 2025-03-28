import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

const GoogleLoginButton = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/current-user", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const handleLogin = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const handleLogout = () => {
    axios
      .get("http://localhost:5000/auth/logout", { withCredentials: true })
      .then(() => {
        setUser(null);
        window.location.reload();
      })
      .catch(() => alert("Logout failed"));
  };

  return (
    <>
      {user ? (
        <Button variant="danger" onClick={handleLogout}>
          Logout ({user.displayName})
        </Button>
      ) : (
        <Button variant="primary" onClick={handleLogin}>
          Login with Google
        </Button>
      )}
    </>
  );
};

export default GoogleLoginButton;

