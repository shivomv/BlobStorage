const express = require("express");
const {
    createProject,
    updateProject,
    deleteProject,
    generateApiKey,
} = require("../controllers/projectController");

const router = express.Router();

// Create a Project
router.post("/project", createProject);

// Update a Project
router.put("/project/:id", updateProject);

// Delete a Project
router.delete("/project/:id", deleteProject);

// Generate a New API Key
router.post("/project/:id/generate-apikey", generateApiKey);

module.exports = router;
