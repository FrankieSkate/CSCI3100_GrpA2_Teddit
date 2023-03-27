const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const TweetCommentSchema = new Schema({
    user_id: Number,
    tweet_id: {
        type: Schema.Types.ObjectId,
        ref: "Tweet",
        required: true
    },
    tweet_comment: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    comment_commter: Number
});

module.exports = mongoose.model('Tweet_comment', TweetCommentSchema);