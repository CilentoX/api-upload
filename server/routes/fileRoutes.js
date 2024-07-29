import express from "express";
import upload from "../config/multer.js";
import File from "../models/fileSchema.js";
import path from "path";
import fs from "fs/promises"; 
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post(
  "/upload",
  upload.single("file"),
  asyncHandler(async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const description = req.body.description || "";

    const newFile = new File({
      filename: req.file.filename,
      originalname: req.file.originalname,
      size: req.file.size,
      description: description || "No Description Avaible",
      mimetype: req.file.mimetype,
    });

    await newFile.save();

    res.json({ filename: req.file.filename });
  })
);

router.get(
  "/files",
  asyncHandler(async (req, res) => {
    const files = await File.find();
    res.json(files);
  })
);

router.get(
  "/files/:filename",
  asyncHandler(async (req, res) => {
    const file = await File.findOne({ filename: req.params.filename });
    if (!file) return res.status(404).send("File not found");

    const filePath = path.join(__dirname, "../uploads", file.filename);
    res.sendFile(filePath);
  })
);

router.delete(
  "/files/:filename",
  asyncHandler(async (req, res) => {
    const file = await File.findOneAndDelete({ filename: req.params.filename });
    if (!file) return res.status(404).send("File not found");

    const filePath = path.join(__dirname, "../uploads", file.filename);
    await fs.unlink(filePath);

    res.json({ message: "File deleted" });
  })
);

router.delete(
  "/files",
  asyncHandler(async (req, res) => {
    const files = await File.find();
    if (files.length === 0) return res.status(404).send("No files found");

    await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(__dirname, "../uploads", file.filename);
        await fs.unlink(filePath);
      })
    );

    await File.deleteMany();
    res.json({ message: "All files deleted" });
  })
);

router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: "Internal server error",
    message: err.message,
  });
});

export default router;
