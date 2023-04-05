const userDAO = require("../dao/user");

class UserController {

    // async follow(req, res) {
    //     try {
    //         const {  } = req.body;
    //         const ret = await userDAO;
    //         res.status(201).json(ret);
    //     } catch (err) {
    //         res.status(400).send(err);
    //     }
    // }

    async userLogin(req, res) {
        try {
            const { useraccount, password } = req.body;
            const id = await userDAO.userLogin(useraccount, password);
            res.status(201).json(id);
        } catch (err) {
            res.status(400).send('error');
        }
    }

    async follow(req, res) {
        try {
            const { user_id, following_id } = req.body;
            const ret = await userDAO.follow(user_id, following_id);
            console.log('test from user controller', ret);
            res.status(201).json(ret);
        } catch (err) {
            res.status(400).send(err);
        }
    }

    async getFollower(req, res){
        try {
            const { user_id } = req.query;
            const id = Number(user_id);
            if(isNaN(id)){
                throw new Error('Fail to get data');
            }
            console.log(id,typeof(id));
            const follower_list = await userDAO.getFollower(id);
            console.log('test from user controller get follower', follower_list);
            res.status(201).json(follower_list);
        } catch (err) {
            res.status(400).send(err);
        }
    }

    async getFollowing(req, res) {
        try {
            const { user_id } = req.query;
            const id = Number(user_id);
            if(isNaN(id)){
                throw new Error('Fail to get data');
            }
            const following_list = await userDAO.getFollowing(id);
            res.status(201).json(following_list);
        } catch (err) {
            res.status(400).send(err);
        }
    }
    
    async register(req, res) {
            try {
                const { account, mail_address, password } = req.body;
                const checking_ret = await userDAO.checkMailRegistered(mail_address);
                if(Object.keys(mail_exist).length !== 0 ){
                    if(checking_ret.account == account) {
                        throw new Error("This mail address has been registered");
                    } else {
                        throw new Error("This account has been registered");
                    }
                }
                const ret = await userDAO.register(account, mail_address, password);
                res.status(201).json({message: ret});
            } catch (err) {
                res.status(400).send(err);
            }
        }
}

module.exports = new UserController();