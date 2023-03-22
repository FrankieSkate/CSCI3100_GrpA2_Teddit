const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    
}, { timestamps: true });

module.exports = mongoose.model('User_account', UserSchema);