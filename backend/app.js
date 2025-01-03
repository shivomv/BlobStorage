// Import required modules
const express = require("express"); // Import the Express.js framework
const cookieParser = require("cookie-parser"); // Import the cookie-parser middleware
const path = require("path");
const dotenv = require("dotenv");

// Create an instance of the Express app
const app = express();

// Load Environment Variables
/**
 * Load environment variables from the config.env file using dotenv.
 */
dotenv.config({ path: "config/config.env" });
app.use("/uploads", express.static(process.env.UPLOAD_PATH));


// Import error handling middleware
const errorMiddleware = require("./middlewares/error");

// Middleware to parse JSON requests
app.use(express.json()); // Enable JSON parsing for incoming requests
app.use(cookieParser()); // Enable cookie parsing for incoming requests

// Import route modules
const user = require("./routes/userRoute"); // Import user route module
const project = require("./routes/projectRoute"); // Import project route module
const file = require("./routes/fileRoute"); // Import file route module

// Use routes
const baseUrl = "/api/v1";
app.use(baseUrl, user); // Mount user routes at /api/v1
app.use(baseUrl, project); // Mount project routes at /api/v1
app.use(baseUrl, file); // Mount file routes at /api/v1
    
// Middleware for handling errors
app.use(errorMiddleware); // Use error handling middleware to catch and handle errors

// Export the Express app
module.exports = app;