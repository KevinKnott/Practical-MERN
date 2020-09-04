const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

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


// app.get("/", (req, res) => {
//     res.send({ hi: 'there' });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT);