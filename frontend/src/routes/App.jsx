import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import APIDocs from "../components/APIDocs";
import OpenAPIUploader from "../components/OpenAPIUploader";
import APITester from "../components/APITester";
import Home from "../components/Home";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import Profile from "../components/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/get-started" element={<OpenAPIUploader />} />
        <Route path="/docs" element={<APIDocs />} />
        <Route path="/api-tester" element={<APITester />} />
        <Route path="/f" element={<Profile />} />

      </Routes>
    </Router>
  );
}

export default App;
