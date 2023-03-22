const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const TweetCommentSchema = new Schema({
    tweet_id:{
        type: Schema.Types.ObjectId,
        ref: "Tweet",
        required: true
    },
    tweet_comment:[{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
}, { timestamps: true });

module.exports = mongoose.model('User_account', TweetCommentSchema);