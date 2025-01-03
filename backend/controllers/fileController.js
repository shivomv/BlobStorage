const File = require("../models/fileModel");
const fs = require("fs");
const path = require("path");

// Upload a File
exports.uploadFile = async (req, res) => {
    try {
        const { projectid } = req.body;

        // Check if a file is uploaded
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        const { originalname, mimetype, path, size } = req.file;

        // Create a new file entry in the database
        const file = await File.create({
            projectid,
            filename: originalname,
            path,
            size,
            type: mimetype,
            accesspath: `${req.protocol}://${req.get("host")}/uploads/${path.substring(path.lastIndexOf("\\") + 1)}`,
        });

        res.status(201).json({
            success: true,
            fileId: file._id,
            accessPath: file.accesspath,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update a File
exports.updateFile = async (req, res) => {
    try {
        const { id } = req.params;
        const { filename, path, size, type, accesspath } = req.body;

        const file = await File.findByIdAndUpdate(
            id,
            { filename, path, size, type, accesspath, updateddatetime: Date.now() },
            { new: true, runValidators: true }
        );

        if (!file) {
            return res.status(404).json({ success: false, message: "File not found" });
        }

        res.status(200).json({
            success: true,
            file,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete a File
exports.deleteFile = async (req, res) => {
    try {
        const { id } = req.params;

        const file = await File.findByIdAndDelete(id);

        if (!file) {
            return res.status(404).json({ success: false, message: "File not found" });
        }

        // Delete the file from the server
        fs.unlinkSync(path.join(__dirname, "..", file.path));

        res.status(200).json({
            success: true,
            message: "File deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get File by ID
exports.getFileById = async (req, res) => {
    try {
        const { id } = req.params;

        const file = await File.findById(id);

        if (!file) {
            return res.status(404).json({ success: false, message: "File not found" });
        }

        res.status(200).json({
            success: true,
            file,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Files by Project ID
exports.getFilesByProject = async (req, res) => {
    try {
        const { projectid } = req.params;

        const files = await File.find({ projectid });

        res.status(200).json({
            success: true,
            files,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get File for download by its access path
exports.getFileForDownload = async (req, res) => {
    try {
        const { id } = req.params;

        const file = await File.findById(id);

        if (!file) {
            return res.status(404).json({ success: false, message: "File not found" });
        }

        // Send file for download
        res.download(path.join(__dirname, "..", file.path), file.filename);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
