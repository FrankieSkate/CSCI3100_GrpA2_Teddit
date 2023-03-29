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
                // TODO: need check ok or not
                user_id, following_id
            });
        return ret;
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


}

module.exports = new UserDAO();