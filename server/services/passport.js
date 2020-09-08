const passport = require('passport');
require('dotenv').config({ path: 'D:\\Practical MERN\\server\\.env' });
const GoogleStrategy = require('passport-google-oauth20').Strategy;


//  Make sure that we are using passport specifically with Google OAuth2.0
//  Passport.use can be added multiple times for different strategies
// const callbackURI = "http://localhost:" + process.env.PORT + "/auth/google/callback";
passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
    }, (accessToken) => { console.log(accessToken); })
);
