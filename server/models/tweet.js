const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const TweetSchema = new Schema({
    _id: Schema.Types.ObjectId,
    user_id:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    tweet_text:{
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Tweet', TweetSchema);