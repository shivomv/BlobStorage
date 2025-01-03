const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
    {
        projectid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: [true, "Associated project ID is required"],
        },
        filename: {
            type: String,
            required: [true, "File name is required"],
        },
        path: {
            type: String,
            required: [true, "File path is required"],
        },
        size: {
            type: Number, // File size in bytes
            required: [true, "File size is required"],
        },
        type: {
            type: String, // MIME type of the file
            required: [true, "File type is required"],
        },
        accesspath: {
            type: String, // URL or path to access the file
            required: [true, "Access path is required"],
        },
        uploadeddatetime: {
            type: Date,
            default: Date.now,
        },
        updateddatetime: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

const File = mongoose.model("File", fileSchema);

module.exports = File;
