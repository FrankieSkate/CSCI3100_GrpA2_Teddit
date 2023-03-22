const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserRelationSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    following: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    follower: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
}, { timestamps: true });

module.exports = mongoose.model('User_relation', UserRelationSchema);