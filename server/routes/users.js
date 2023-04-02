const router = require('express').Router();
const userController = require('../controllers/user');
const Auth = require('../middleware/auth')

router.route('/test')
    .get((req, res) => {
        res.send('test');
    });

router.post('/login', Auth.verify, userController.userLogin);

router.post('/follow', Auth.verify, userController.follow);

router.get('/getFollower', Auth.verify, userController.getFollower);

router.get('/getFollowing', Auth.verify, userController.getFollowing);

router.post('/register', Auth.verify, userController.register);

router.post('/updateInfo', Auth.verify, userController.updateUserInfo);

router.get('/searchUser', Auth.verify, userController.searchUser);

router.delete('/deleteUser/:id', Auth.verify, userController.deleteUser);

// router.get('/viewAllUser', )

module.exports = router;