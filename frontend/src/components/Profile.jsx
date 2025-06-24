import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  async function fetchProfile() {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:4000/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data);
    } catch (err) {
      console.error("Access denied or error", err.response?.data);
      setErr("access denied, Please Login first");
    }
  }

  const openLogin = (e) => {
    navigate("/login");
  };
  return (
    <div>
      fetch Profile
      <button onClick={fetchProfile}>click</button>
      {err && (
        <>
          <p className="text-red-500">{err}</p>
          <button className="underline" onClick={openLogin}>
            login here
          </button>
        </>
      )}
    </div>
  );
};

export default Profile;
