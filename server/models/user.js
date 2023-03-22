const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);