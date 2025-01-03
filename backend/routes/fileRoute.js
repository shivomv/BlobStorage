const express = require("express");
const {
    uploadFile,
    updateFile,
    deleteFile,
    getFileById,
    getFilesByProject,
    getFileForDownload,
} = require("../controllers/fileController");
const upload = require("../utils/fileUpload");

const router = express.Router();

// Upload a file to a project
router.post("/file/upload", upload.single("file"), uploadFile);

// Update a file details by ID
router.put("/file/:id", updateFile);

// Delete a file by ID
router.delete("/file/:id", deleteFile);

// Get file details by ID
router.get("/file/:id", getFileById);

// Get all files associated with a project by Project ID
router.get("/files/:projectid", getFilesByProject);

// Download a file by its ID
router.get("/file/:id/download", getFileForDownload);

module.exports = router;
