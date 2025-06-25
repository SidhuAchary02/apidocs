import cloudinary from "../config/cloudinary.js";
import Project from "../models/Project.js";
import fs from "fs";

export async function createProject(req, res) {
  try {
    const { name, logoURL, brandColor } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Project name is required" });
    }

    console.log("request body", req.body);

    const logoPath = req.file.path;

    const uploadResult = await cloudinary.uploader.upload(logoPath, {
      folder: "project_logos",
    });

    const project = new Project({
      ProjectName: name,
      brandColor: brandColor || "#FFFFFF",
      LogoURL: uploadResult.secure_url,
    });

    await project.save();

    fs.unlinkSync(logoPath);

    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create project", detail: error.message });
  }
}
