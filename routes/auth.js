const express = require('express')
const router = express.Router()
const passport = require('passport')


router.get('/twitter/callback', 
    passport.authenticate('twitter', { failureRedirect: '/login' }),
        function(req, res) {
            res.render("dashboard", {user: req.user });
    });

router.get('/twitter/login', passport.authenticate('twitter'));


module.exports = router;