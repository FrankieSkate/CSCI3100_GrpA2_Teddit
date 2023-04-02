const knex = require("../data/db")

class UserDAO {

    // TODO able gmail or useraccount
    async userLogin(useraccount){
        const user = await knex("user_account")
            .select("id", "password")
            // TODO: need to check with this or condition work or not
            .where("account", useraccount)
        return user;
    }

    async follow(user_id, following_id){
        const ret = await knex("user_relation")
            .insert({
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

    async checkMailOrAccountRegistered(account,mail_address){
        const ret = await knex("user_account")
            .select("mail_address", "account")
            .where("mail_address", mail_address)
            .orWhere("account", account);
        return ret;
    }

    async register(account, mail_address, password){
        const user_id = await knex("user_account")
            .insert({
                account, mail_address, password
            },['id']);
        return user_id;
    }

    async updateUserInfo(user_id, user_name, bio, avatar_source_url, cover_source_url){
        const update_col = {};
        if(user_name) update_col["name"]=user_name;
        if(bio) update_col["bio"]=bio;
        if(avatar_source_url) update_col["avatar_source_url"]=avatar_source_url;
        if(cover_source_url) update_col["cover_source_url"]=cover_source_url;
        const new_user_info = await knex("user_info")
            .where("user_id", user_id)
            .update(update_col)
            .returning("*");
        return new_user_info;
    }

    async searchUser(search_field){
        const search_result = knex('user_info')
            .wherelLike('user_id', '%'+search_field+'%')
            .orWherelLike('name', '%'+search_field+'%')
            .select("name", "user_id");
        return search_result;
    }

    async deleteUser(user_id){
        const ret = knex('user_account')
            .where("id", user_id)
            .del();
        return ret;
    }

    // for admin use only
    async viewAllUserInfo(search_field){
        const user_info = knex('user_account')
            .join("user_info", user)
            .select("user_info.*", "user_account.mail_address", "user_account.admin");
        return user_info;
    }

}

module.exports = new UserDAO();