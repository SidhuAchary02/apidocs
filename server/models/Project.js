import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    ProjectName: {
      type: String,
      required: true,
    },
    LogoURL: {
      type: String,
    },
    brandColor: {
      type: String,
      default: "#FFFFFF",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
