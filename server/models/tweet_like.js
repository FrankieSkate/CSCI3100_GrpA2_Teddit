const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const TweetLikeSchema = new Schema({
    tweet_id:{
        type: Schema.Types.ObjectId,
        ref: "Tweet",
        required: true
    },
    like_from:[{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    like_counter: Number,
});

module.exports = mongoose.model('Tweet_like', TweetLikeSchema);