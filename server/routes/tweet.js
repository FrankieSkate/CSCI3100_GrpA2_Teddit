const router = require('express').Router();
const TweetController = require('../controllers/tweet');
const Auth = require('../middleware/auth.js');

router.post('/post', Auth.verify, TweetController.post);

router.post('/edit', Auth.verify, TweetController.edit);

router.delete('/delete/:tweetid', Auth.verify, TweetController.delete);

router.get('/gettweet', TweetController.getTweet);

router.post('/comment', Auth.verify, TweetController.comment);

router.get('/getcomment', TweetController.getComment);

module.exports = router;