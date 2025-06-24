import mongoose from "mongoose";

const openAPISchema = new mongoose.Schema({
    filename: String,
    spec: mongoose.Schema.Types.Mixed,
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

const OpenAPIDoc = mongoose.model("OpenAPIDoc", openAPISchema);

export default OpenAPIDoc;
