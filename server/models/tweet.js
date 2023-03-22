const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    tweet_id:{
        type: Number,
        required: true
    },
    user_id:{
        type: Number,
        required: true
    },
    tweet_tweet:{
        type: String,
        required: true
    },
    createDate:{
        type: timestamps,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('tweet', UserSchema);