import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleSignup = () => {
    navigate("/signup");
  };
  return (
    <div>
      <h1>Welcome to the API Documentation</h1>
      <p>
        This is a simple API documentation site built with React. You can use
        the navigation links above to explore the different sections.
      </p>

      <button onClick={handleLogin}>login</button>
      <button onClick={handleSignup}>signup</button>
    </div>
  );
};

export default Home;
