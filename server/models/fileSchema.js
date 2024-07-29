import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  filename: String,
  originalname: String,
  size: Number, 
  description: { type: String, default: "No Description Avaible" }, 
  uploadDate: { type: Date, default: Date.now },
  mimetype: String, 
});

const File = mongoose.model("File", fileSchema, "api_upload_Files");

export default File;
