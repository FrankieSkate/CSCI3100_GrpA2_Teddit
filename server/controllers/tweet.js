const TweetDAO = require("../dao/tweet")

class TweetController {
    // async follow(req, res) {
    //     try {
    //         const {  } = req.body;
    //         const ret = await TweetDAO;
    //         res.status(201).json(ret);
    //     } catch (err) {
    //         res.status(400).send(err);
    //     }
    // }

    // TODO: upload image and update database
    async post(req, res) {
        try {
            const { user_id, context, image_path, retweet_id } = req.body;
            if (!user_id || !context){
                return res.status(400).send('invalid post')
            }
            const ret = await TweetDAO;
            res.status(201).json(ret);
        } catch (err) {
            res.status(400).send(err);
        }
    }

    // can edit image?
    async edit(req, res) {
        try {
            const { tweet_id, context, } = req.body;
            const ret = await TweetDAO.edit(tweet_id, context);
            res.status(201).json(ret);
        } catch (err) {
            res.status(400).send(err);
        }
    }

    async delete(req, res) {
        try {
            const { tweetid } = req.params;
            const ret = await TweetDAO.delete(tweetid);
            res.status(201).json({message: "Delete success."});
        } catch (err) {
            res.status(400).send(err);
        }
    }

    async getTweet(req, res) {
        try {
            const { user_id } = req.query;
            
            if(user_id && Number(user_id)) {
                const id = Number(user_id);
                const ret = await TweetDAO.getFollowingUserTweet(id);
            } else {
                const ret = await TweetDAO.getTweet();
            }
            res.status(201).json(ret);
        } catch (err) {
            res.status(400).send(err);
        }
    }

    async comment(req, res) {
        try {
            const { user_id, tweet_id, tweet_comment } = req.body;
            if (!(user_id&&tweet_id&& tweet_comment)){
                return res.status(400).send("Invalid comment.");
            }
            const ret = await TweetDAO.comment(user_id, tweet_id, tweet_comment);
            res.status(201).json(ret);
        } catch (err) {
            res.status(400).send(err);
        }
    }

    async getComment(req, res) {
        try {
            const { tweet_id } = req.body;
            const id = Number(tweet_id);
            if(isNaN(id)){
                throw new Error('Fail to get tweet id.');
            }
            const ret = await TweetDAO.getComment(id);
            res.status(201).json(ret);
        } catch (err) {
            res.status(400).send(err);
        }
    }

}

module.exports = new TweetController();