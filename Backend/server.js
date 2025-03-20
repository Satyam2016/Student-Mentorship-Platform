const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const jwt = require("jsonwebtoken");
require("dotenv").config();
require("./passportConfig");



const app = express();
const PORT = 5000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json()); // Middleware to parse JSON body
app.use(session({ secret: "supersecret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//Google OAuth Route
app.get("/auth/google", passport.authenticate("google", { 
     scope: ["profile", "email", "https://www.googleapis.com/auth/calendar.events"] 
}));


// Google OAuth callback
app.get(
     "/auth/google/callback",
     passport.authenticate("google", { failureRedirect: "/" }),
     (req, res) => {
       if (!req.user) {
         return res.redirect("http://localhost:5173?error=AuthenticationFailed");
       }
   
       //Generate JWT including user's Google OAuth tokens
       const token = jwt.sign(
         {
           user: req.user.profile,
           accessToken: req.user.accessToken,
           refreshToken: req.user.refreshToken, // Store refresh token
         },
         process.env.JWT_SECRET,
         { expiresIn: "1h" }
       );
   
       //Store refresh token in session or database for future use
       req.session.refreshToken = req.user.refreshToken;
       res.redirect(`http://localhost:5173/dashboard?token=${token}`);
     }
);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
