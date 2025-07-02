import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const DashboardHome = () => {
    const [err, setErr] = useState('');
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    async function fetchProjects() {
        const token = localStorage.getItem("token");

        try {
            const response = await api.get("/get-projects", {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Fetched projects:", response.data);
            setProjects(response.data.projects);
        } catch (error) {
            console.error("Access denied or error", error.response?.data);
            setErr("Access denied, please login first.");
        }
    }

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h1>Your Projects</h1>
            {err && <p style={{ color: "red" }}>{err}</p>}

            {projects.length === 0 ? (
                <p>No projects found.</p>
            ) : (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                    {projects.map((project) => (
                        <div
                            key={project._id}
                            style={{
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                padding: "12px",
                                width: "250px",
                                background: project.brandColor,
                                color: "#333",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                cursor: "pointer"
                            }}
                            onClick={() => navigate(`/project/${project._id}`)}
                        >
                            <img
                                src={project.LogoURL}
                                alt={project.ProjectName}
                                style={{ width: "100%", height: "150px", objectFit: "contain", borderRadius: "4px" }}
                            />
                            <h3 style={{ margin: "8px 0 4px" }}>{project.ProjectName}</h3>
                            <p style={{ margin: 0 }}>Subdomain: <strong>{project.subdomain}.apiglow.vercel.app</strong></p>
                            <p style={{ fontSize: "12px", color: "#555" }}>
                                Created: {new Date(project.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DashboardHome;
