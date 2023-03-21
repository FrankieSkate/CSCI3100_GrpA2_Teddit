const router = require('express').Router();


router.route('/')
    .get((req, res) => {
        res.send('Hello from user');
    });

module.exports = router;