const mongoose = require("mongoose");
const crypto = require("crypto");

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please Enter Project Name"],
        },
        associateduser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Please Enter Associated User"],
        },
        apikey: {
            type: String,
            unique: true,
            default: () => crypto.randomBytes(32).toString("hex"), // Generate a unique API key
        },
        createdatetime: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
