import React from "react";

const Home = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:5173/login";
  };
  const handleSignup = () => {
    window.location.href = "http://localhost:5173/signup";
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
