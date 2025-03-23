const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const connectingDatabase = require('./database/connect.js')
const authRoutes = require("./routes/auth");


const app = express();
const port = 5000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json()); // Middleware to parse JSON body

app.get('/', (req, res)=>{
  res.send("Server start")
})

app.use("/api/auth", authRoutes);

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
     
    });
    await connectingDatabase();
  } catch (error) {
    console.log(error);
  }
};

start();
