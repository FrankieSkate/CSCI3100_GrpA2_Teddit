const knex = require("../data/db")

class UserDAO {

    // TODO able gmail or useraccount
    async userLogin(useraccount, password){
        const [id] = await knex("user_account")
            .select("id")
            // .where(function(){
            //     // TODO: need to check with this or condition work or not
            //     this.where("account", useraccount).orwhere("mail_address", useraccount)
            // })
            .where("account", useraccount)
            .where("password", password); 
        return id;
    }

    async follow(user_id, following_id){
        const ret = await knex("user_relation")
            .insert({
                user_id, following_id
            });
        return true;
    }

    async getFollower(user_id){
        const follower_list = await knex("user_info")
            .join("user_relation", "user_info.user_id", "=", "user_relation.user_id")
            .where("user_relation.following_id", user_id)
            .select("user_info.*");
        return follower_list;
    }

    async getFollowing(user_id){
        const following_list = await knex("user_info")
            .join("user_relation", "user_info.user_id", "=", "user_relation.following_id")
            .where("user_relation.user_id", user_id)
            .select("user_info.*");
        return following_list;
    }

    async checkMailOrAccountRegistered(account,mail_address){
        const [ret] = await knex("user_account")
            .select("mail_address", "account")
            .where("mail_address", mail_address)
            .orWhere("account", account);
        return [ret];
    }

    async register(account, mail_address, password){
        const user_id = await knex("user_account")
            .insert({
                account, mail_address, password
            },['id']);
        return user_id;
    }

}

module.exports = new UserDAO();