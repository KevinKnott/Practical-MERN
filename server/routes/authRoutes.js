const passport = require('passport');

module.exports = (app) => {

    app.get(
        '/auth/google',
        passport.authenticate("google", {
            scope: ['profile', 'email']
        })
    );

    // Create user for us since we have the callback token
    app.get("/auth/google/callback",
        passport.authenticate('google')
    );
};