import React, { useState } from "react";
import axios from "axios";
import GoogleAuthButton from "./GoogleAuthButton";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    console.log(data);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/login",
        data
      );
      localStorage.setItem('token', response.data.token);
      console.log("Login successful:", response.data);
      setMessage(response.data.message);
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Network error");
      }
    }
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <GoogleAuthButton />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
};

export default LoginForm;
