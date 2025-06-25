import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./db.js";
import multer from "multer";
import fs from "fs";
import yaml from "js-yaml";
import OpenAPIDoc from "./models/OpenAPIDoc.js";
import router from "./router/user.js";
import dotenv from "dotenv";
import projectRouter from "./router/project.js";

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", router);
app.use("/api", projectRouter);

const upload = multer({ dest: "uploads/" });
let currentOpenAPISpec = null;

// Upload route
app.post("/upload-openapi", upload.single("file"), async (req, res) => {
  console.log("File received:", req.file);
  console.log("Body:", req.body);

  if (!req.file) {
    return res.status(400).json({ error: "No file received" });
  }

  const filePath = req.file.path;

  try {
    const fileData = fs.readFileSync(filePath, "utf-8");
    let spec;

    if (
      req.file.mimetype === "application/json" ||
      req.file.originalname.endsWith(".json")
    ) {
      spec = JSON.parse(fileData);
    } else if (
      req.file.mimetype === "application/x-yaml" ||
      req.file.mimetype === "text/yaml" ||
      req.file.originalname.endsWith(".yaml") ||
      req.file.originalname.endsWith(".yml")
    ) {
      spec = yaml.load(fileData);
    } else {
      fs.unlinkSync(filePath);
      return res
        .status(400)
        .json({ error: "Unsupported file type. Please upload JSON or YAML." });
    }

    const doc = new OpenAPIDoc({
      filename: req.file.originalname,
      spec: spec,
    });
    await doc.save();

    currentOpenAPISpec = spec;

    // Cleanup
    fs.unlinkSync(filePath);

    res.json({ message: "OpenAPI file uploaded and loaded successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to process OpenAPI file" });
  }
});

app.get("/openapi.json", (req, res) => {
  if (!currentOpenAPISpec) {
    return res.status(404).json({ error: "No OpenAPI spec available" });
  }
  res.json(currentOpenAPISpec);
});

connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(
    `📄 Upload OpenAPI file at POST http://localhost:${PORT}/upload-openapi`
  );
  console.log(`🔍 View docs at GET http://localhost:${PORT}/docs`);
});
