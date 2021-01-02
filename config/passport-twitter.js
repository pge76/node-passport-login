const TwitterStrategy = require('passport-twitter').Strategy
const User = require('../model/User')

module.exports = (passport) => {
    passport.use(new TwitterStrategy({
        consumerKey: process.env['TWITTER_CONSUMER_KEY'],
        consumerSecret: process.env['TWITTER_CONSUMER_SECRET'],
        callbackURL: "/auth/twitter/callback"
    },
        (accessToken, tokenSecret, profile, cb) => {
            console.log("accessToken", accessToken)
            console.log("tokenSecret", tokenSecret)
            console.log("profile", profile)

            User.findOne({ twitterExternalId: profile.id })
                .then(user => {
                    console.log("user", user)
                    // if we have no user, we create it, otherwise we return the found user
                    if (!user) {
                        let user = new User({ twitterExternalId: profile.id, name: profile.username, isTwitter: true })
                        user.save()
                        console.log("user after save", user)

                        return cb(null, user)
                    } else {
                        return cb(null, user)
                    }
                })
                .catch(err => console.log(err))
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}