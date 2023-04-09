const router = require('express').Router();
const TweetController = require('../controllers/tweet');
const verify = require('../middleware/auth.js');

router.post('/post', verify, TweetController.post);

router.post('/edit', verify, TweetController.edit);

router.delete('/delete/:tweetid', verify, TweetController.delete);

router.get('/gettweet', TweetController.getTweet);

router.post('/comment', verify, TweetController.comment);

router.get('/getcomment', TweetController.getComment);

module.exports = router;