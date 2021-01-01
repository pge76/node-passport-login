const LocalStategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// User Model
const User = require('../model/User')


module.exports = (passport) => {
    passport.use(new LocalStategy({ usernameField: 'email' }, (email, password, done) => {
        if(!password) {
            return done(null, false, { message: 'You need to enter a password..'})
        }

        User.findOne({email: email})
        .then(user => {
            if(!user) {
                return done(null, false, { message: 'That email is not registered..'})
            }

            bcrypt.compare(password, user.password, (err, success) => {
                if(err) throw err;

                if(success) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Password incorrect' });
                }
            });
        })
        .catch(err => console.log(err))
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}
