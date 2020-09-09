const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


const User = mongoose.model('users');

//  Make sure that we are using passport specifically with Google OAuth2.0
//  Passport.use can be added multiple times for different strategies
// const callbackURI = "http://localhost:" + process.env.PORT + "/auth/google/callback";
passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
    }, (accessToken, refreshToken, profile, cb) => {
        // console.log(profile.id);
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //     return cb(err, user);
        // });
        const potentialUser = { googleId: profile.id };

        User.findOne(potentialUser, (err, foundUser) => {
            if (err) {
                console.log(err);
            } else {

                if (foundUser) {
                    console.log("Nothing to do user already exists");
                }
                else {
                    new User(potentialUser).save();
                }
            }
        });
    })
);
