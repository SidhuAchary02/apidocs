import cloudinary from "../config/cloudinary.js";
import Project from "../models/Project.js";
import fs from "fs";

export async function createProject(req, res) {
  try {
    const { name, brandColor, subdomain } = req.body;

    const userId = req.user.id;

    if (!name) {
      return res.status(400).json({ message: "Project name is required" });
    }

    const cleanedSubdomain = subdomain.toLowerCase().trim();
    if (!/^[a-z0-9\-]+$/.test(cleanedSubdomain)) {
      return res.status(400).json({ message: "Invalid subdomain format" });
    }

    const existingSubdomain = await Project.findOne({
      subdomain: cleanedSubdomain,
    });
    if (existingSubdomain) {
      return res.status(400).json({ message: "Subdomain already taken" });
    }

    console.log("request body", req.body);

    let logoURL = "";
    if (req.file) {
      const logoPath = req.file.path;
      const uploadResult = await cloudinary.uploader.upload(logoPath, {
        folder: "project_logos",
      });
      logoURL = uploadResult.secure_url;
      fs.unlinkSync(logoPath);
    }

    const project = new Project({
      ProjectName: name,
      brandColor: brandColor || "#FFFFFF",
      LogoURL: logoURL,
      user: userId,
      subdomain: cleanedSubdomain,
    });

    await project.save();

    res.status(201).json({
      message: "Project created successfully",
      project,
      projectURL: `https://${cleanedSubdomain}.docgen.vercel.app`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create project", detail: error.message });
  }
}

export async function getAllProjects(req, res) {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({ message: "user not found" });
    }

    const projects = await Project.find({ user: userId }).sort({
      createdAt: -1,
    });
    res.status(200).json({ projects });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while fetching projects" });
  }
}
