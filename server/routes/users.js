const router = require('express').Router();
const knex = require('../data/db');

router.route('/')
    .get((req, res) => {
        knex.select().from('users').then((users)=>{
            res.send(users);
        });
    });

module.exports = router;