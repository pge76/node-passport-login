const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('welcome');
});
router.get('/dashboard', (req, res) => {
    res.render('dashboard', {
        user: req.user
    });
});


module.exports = router;