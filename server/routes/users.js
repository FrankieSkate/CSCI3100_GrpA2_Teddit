const router = require('express').Router();
const knex = require('../data/db');
const userController = require('../controllers/user');

router.route('/test')
    .get((req, res) => {
        res.send('test');
    });

router.post('/login',userController.userLogin);

router.post('/follow', userController.follow);

router.get('/getFollower', userController.getFollower);

router.get('/getFollowing', userController.getFollowing);

router.post('/register', userController.register);

module.exports = router;