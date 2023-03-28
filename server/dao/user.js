const knex = require('../data/db')

class UserDAO {
    async userLogin(useraccount, password) {
        const [id] = await knex('user_account')
            // .where(function(){
            //     // TODO: need to check with this or condition work or not
            //     this.where('account', useraccount).orwhere('mail_address', useraccount)
            // })
            .where('account', useraccount)
            .where('password', password)
            .returning('id'); 
        return id;
    }
}

module.exports = new UserDAO();