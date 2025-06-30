import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewProject = () => {
  const [projectName, setProjectName] = useState("");
  const [color, setColor] = useState("#FFFFFF");
  const [logo, setLogo] = useState("");
  const [msg, setMsg] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("newProjectFOrm"));
    if (savedData) {
      setProjectName(savedData.projectName || "");
      setColor(savedData.color || "#FFFFFF");
      setSubdomain(savedData.subdomain || "");
    }
  }, []);

  useEffect(() => {
    const dataToSave = {
      projectName,
      color,
      subdomain,
    };

    localStorage.setItem("newProjectFOrm", JSON.stringify(dataToSave));
  }, [projectName, color, subdomain]);

  //   useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     console.log("User is logged in with token:", token);
  //     // fetch user data if needed
  //   }
  // }, []);

  const handleContinue = (e) => {
    e.preventDefault();
    if (!projectName) {
      setMsg("All fields are required.");
      return;
    }

    setShowOptions(true);
  };

  const handleOption = async (choice) => {
    const formData = new FormData();
    formData.append("name", projectName);
    formData.append("brandColor", color);
    formData.append("logo", logo);
    formData.append("subdomain", subdomain);

    const subdomainRegex = /^[a-z0-9\-]+$/;
    if (!subdomainRegex.test(subdomain)) {
      setMsg(
        "Subdomain can only contain lowercase letters, numbers, and hyphens."
      );
      return;
    }

    console.log(logo);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/project/new",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setMsg(response.data.message);
      setMsg(`Project created: ${response.data.projectURL}`);
      console.log("project created", response.data);

      localStorage.removeItem("newProjectFOrm");

      // Redirect based on choice
      if (choice === "upload") {
        navigate("/upload-openapi");
      } else {
        navigate("/manual-define");
      }
    } catch (error) {
      console.error("Project creation failed:", error);
      setMsg("Failed to create project");
    }
  };

  return (
    <div>
      <h1>Project Setup</h1>

      {!showOptions ? (
        <form onSubmit={handleContinue}>
          <label>Project Name</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Wonderful Docs"
            required
          />
          <label>SubDomain</label>
          <input
            type="text"
            value={subdomain}
            onChange={(e) => setSubdomain(e.target.value)}
            placeholder="wonderful-docs"
            required
          />
          <label>Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setLogo(e.target.files[0])}
          />
          <label>Brand Color</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
          />

          <button type="submit">Continue</button>
        </form>
      ) : (
        <div>
          <h3>How do you want to document your API?</h3>
          <button onClick={() => handleOption("upload")}>
            Upload OpenAPI File
          </button>
          <button onClick={() => handleOption("manual")}>
            Manually Define API
          </button>
        </div>
      )}

      {msg && <p>{msg}</p>}
    </div>
  );
};

export default NewProject;
