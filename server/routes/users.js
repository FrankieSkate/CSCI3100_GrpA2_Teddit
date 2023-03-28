const router = require('express').Router();
const knex = require('../data/db');
const userController = require('../controllers/user');

router.route('/')
    .get((req, res) => {
        knex.select().from('users').then((users)=>{
            res.send(users);
        });
    });

router.post('/login',userController.userLogin);

module.exports = router;