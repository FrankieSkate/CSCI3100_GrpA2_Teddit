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
            const [user] = await userDAO.userLogin(useraccount);
            if(!user){
                res.status(400).send('invalid login')
            }
            else if(lenuser.password !== password){
                res.status(400).send('invalid login')
            } else {
                // not only return the id, but return all needed info
                res.status(200).json(id);
            }
        } catch (err) {
            res.status(400).send('error');
        }
    }

    // return true or error
    async follow(req, res) {
        try {
            const { user_id, following_id } = req.body;
            const ret = await userDAO.follow(user_id, following_id);
            console.log('test from user controller', ret);
            res.status(201).json({message: "success"});
        } catch (err) {
            res.status(400).send(err);
        }
    }

    // return array of object with follower info
    async getFollower(req, res){
        try {
            const { user_id } = req.query;
            const id = Number(user_id);
            if(isNaN(id)){
                throw new Error('Fail to get data');
            }
            console.log(id,typeof(id));
            const follower_list = await userDAO.getFollower(id);
            console.log('test from user controller get follower', follower_list, typeof(follower_list));
            res.status(200).json(follower_list);
        } catch (err) {
            res.status(400).send(err);
        }
    }

    // return array of object with following user info
    async getFollowing(req, res) {
        try {
            const { user_id } = req.query;
            const id = Number(user_id);
            if(isNaN(id)){
                throw new Error('Fail to get data');
            }
            const following_list = await userDAO.getFollowing(id);
            res.status(200).json(following_list);
        } catch (err) {
            res.status(400).send(err);
        }
    }

    // return user id if registeration success
    async register(req, res) {
            try {
                const { account, mail_address, password } = req.body;
                const [checking_ret] = await userDAO.checkMailOrAccountRegistered(mail_address);
                if(!checking_ret || Object.keys(checking_ret).length !== 0 ){
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
    
    // TODO: the picture upload progress
    async updateUserInfo(req, res) {
        try {
            const { user_name, bio, avatar_source_url, cover_source_url } = req.body;
            const ret = await userDAO.updateUserInfo(user_name, bio, avatar_source_url, cover_source_url);
            res.status(201).json(ret);
        } catch (err) {
            res.status(400).send(err);
        }
    }
    
    async searchUser(req, res) {
        try {
            const { search_field } = req.query;
            const ret = await userDAO.searchUser(search_field);
            res.status(200).json(ret);
        } catch (err) {
            res.status(400).send(err);
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const ret = await userDAO.deleteUser(id);
            res.status(201).json(ret);
        } catch (err) {
            res.status(400).send(err);
        }
    }

    // for admin only
    async viewAllUser(req, res) {
        try {
            const { search_field } = req.query;
            const user_info = await userDAO.viewAllUserInfo(search_field);
            res.status(200).json(user_info);
        } catch (err) {
            res.status(400).send(err);
        }
    }
}

module.exports = new UserController();