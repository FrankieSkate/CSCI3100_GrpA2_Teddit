const router = require('express').Router();
const TweetController = require('../controllers/tweet');
const verify = require('../middleware/auth.js');

router.post('/post', verify, TweetController);

router.edit('/edit', verify, TweetController);


module.exports = router;