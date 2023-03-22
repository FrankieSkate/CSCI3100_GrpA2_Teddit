const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserAccountSchema = new Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    account: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mail_address: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('User_account', UserAccountSchema);