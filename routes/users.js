const express = require('express')
const bcrypt = require('bcryptjs')

const router = express.Router()


// User Model
const User = require('../model/User')

router.get('/login', (req, res) => {
    res.render("login");
});

router.get('/register', (req, res) => {
    res.render("register");
});

// Register handle
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body

    let errors = [];

    // check required fields
    checkRequiredFields(name, email, password, password2, errors);
    checkPasswordsMatch(password, password2, errors);
    checkPasswordLength(password, errors);

    let result = {
        errors,
        name,
        email,
        password,
        password2
    }

    if (errors.length > 0) {
        console.log(errors)
        res.render('register', result)
    } else {
        // Validation passed
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    userAlreadyExists(result, req, res);
                } else {
                    registerNewUser(new User({ name, email, password }), req, res);
                }
            })
    }
});

function userAlreadyExists(result, req, res) {
    result.errors.push({ msg: 'Email already registered' });
    res.render('register', result);
}

function registerNewUser(newUser, req, res) {
    bcrypt.genSalt((err, salt) => {
        console.log("salt", salt);
        console.log("err", err);

        bcrypt.hash(newUser.password, salt, (err, hash) => {
            console.log("hash", hash);
            console.log("err", err);
            if (err)
                throw err;
            newUser.password = hash;
            newUser
                .save()
                .then(user => {
                    console.log("user saved", user);
                    req.flash(
                        'success_msg',
                        'You are now registered and can log in'
                    );
                    res.redirect('/users/login');
                })
                .catch(err => console.log(err));
        });
    });
}

function checkRequiredFields(name, email, password, password2, errors) {
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields..' });
    }
}

function checkPasswordsMatch(password, password2, errors) {
    if (password !== password2) {
        errors.push({ msg: 'Passwords need to match..' })
    }
}

function checkPasswordLength(password, errors) {
    if (password.length < 6) {
        errors.push({ msg: 'Password needs to have at least 6 characters..' })
    }
}

module.exports = router;