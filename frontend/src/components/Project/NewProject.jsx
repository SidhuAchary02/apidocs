import axios from "axios";
import React from "react";
import { useState } from "react";

const NewProject = () => {
  const [projectName, setProjectName] = useState("");
  const [color, setColor] = useState("#FFFFFF");
  const [logo, setLogo] = useState("");
  const [msg, setMsg] = useState("");
  const [showOptions, setShowOptions] = useState(false);

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
      console.log("project created", response.data);

      // Redirect based on choice
      if (choice === "upload") {
        window.location.href = "/upload-openapi";
      } else {
        window.location.href = "/manual-define";
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
          <label>Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setLogo(e.target.files[0])}
            required
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
