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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subdomain:{
      type:String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
