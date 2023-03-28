const userDAO = require("../dao/user");

class UserController {
    async userLogin(req, res){
        try{
            const { useraccount, password } = req.body;
            const id = await userDAO.userLogin(useraccount, password);
            res.status(201).send(id);
        } catch (err){
            res.status(400).send('err');
        }
    }
}

module.exports = new UserController();