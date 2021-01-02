const FacebookStrategy = require('passport-facebook').Strategy

module.export = (passport) => {
    passport.use(new FacebookStrategy({
        clientID: APP_ID,
        clientSecret: APP_SECRET,
        callbackURL: "/auth/facebook/callback"
    },
    (accessToken, refreshToken, profile, done) => {
        console.log("accessToken", accessToken)
        console.log("refreshToken", refreshToken)
        console.log("profile", profile)
    }
    ))
}