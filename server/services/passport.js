const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

//  Make sure that we are using passport specifically with Google OAuth2.0
//  Passport.use can be added multiple times for different strategies
// const callbackURI = "http://localhost:" + process.env.PORT + "/auth/google/callback";
passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
        proxy: true
    }, (accessToken, refreshToken, profile, done) => {
        // console.log(profile.id);
        const potentialUser = { googleId: profile.id };

        User.findOne(potentialUser, (err, foundUser) => {
            if (err) {
                return done(err);
            } else {
                if (foundUser) {
                    console.log(foundUser);
                    return done(null, foundUser);
                }
                else {
                    foundUser = new User(potentialUser);
                    foundUser.save((err) => {
                        if (err) {
                            return done(err);
                        } else {
                            return done(err, foundUser);
                        }
                    });
                }
            }
        });

    })
);
