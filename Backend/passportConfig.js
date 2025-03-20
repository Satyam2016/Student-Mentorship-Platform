const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email", "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/calendar.events"],

    },
    async (accessToken, refreshToken, profile, done) => {
      return done(null, { profile, accessToken,  refreshToken}); // Store token
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});
