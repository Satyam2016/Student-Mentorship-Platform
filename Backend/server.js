const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectingDatabase = require("./database/connect.js");
const authRoutes = require("./routes/auth");
const mentorRoutes = require("./routes/mentor");

const app = express();
const port = 5000;

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json()); // Middleware to parse JSON body
app.use(express.urlencoded({ extended: true })); // Corrected middleware

// Routes
app.get("/", (req, res) => {
  res.send("Server started");
});

app.use("/api/auth", authRoutes);
app.use("/api/mentor", mentorRoutes); // Renamed `mentor` to `mentorRoutes` for clarity

// Start Server
const start = async () => {
  try {
    await connectingDatabase(); // Connect to database before starting server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

start();
