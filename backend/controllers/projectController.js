const Project = require("../models/projectModel");

// Create a Project
exports.createProject = async (req, res) => {
    try {
        const { name, associateduser } = req.body;

        const project = await Project.create({
            name,
            associateduser,
        });

        res.status(201).json({
            success: true,
            project,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update a Project
exports.updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const project = await Project.findByIdAndUpdate(
            id,
            { name },
            { new: true, runValidators: true }
        );

        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }

        res.status(200).json({
            success: true,
            project,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete a Project
exports.deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await Project.findByIdAndDelete(id);

        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }

        res.status(200).json({
            success: true,
            message: "Project deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Generate a New API Key
exports.generateApiKey = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }

        project.apikey = crypto.randomBytes(32).toString("hex");
        await project.save();

        res.status(200).json({
            success: true,
            apikey: project.apikey,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
