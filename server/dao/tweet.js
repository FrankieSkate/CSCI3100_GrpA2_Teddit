const knex = require("../data/db")

class TweetDAO {

    async post(user_id, context, image_path, retweet_id) {
        const insert_data  = {
            "user_id": user_id,
            "context": context,
            "picture_path": image_path,
        };
        if(retweet_id){
            insert_data["retweet_id"] = retweet_id;
        }
        const new_tweet = await knex("tweet")
            .insert(insert_data)
            .returning("*");
        return new_tweet;
    }

    async edit(tweet_id, context, image_path) {
        const edit_tweet = await knex("tweet")
            .where("id", tweet_id)
            .update({
                "context": context,
                // "picture_path": image_path
            });
        return edit_tweet;
    }

    async delete(tweet_id) {
        const ret = await knex("tweet")
            .where("id", tweet_id)
            .del();
        return ret;
    }

    async getTweet() {
        const tweet_list = await knex("tweet")
            .join("user_info", "user_info.user_id", "=", "tweet.user_id")
            .leftJoin(
                knex("tweet_like")
                    .select("tweet_like.tweet_id", "tweet_like.like", knex.raw("COUNT(tweet_like.like) as counting "))
                    .groupBy("tweet_like.tweet_id")
                    .groupByRaw("tweet_like.like")
                    .as("like_count"),
                "like_count.tweet_id",
                "tweet.id"
            )
            .orderBy("tweet.created_at", "desc")
            .select("tweet.*", "user_info.name", "user_info.avatar_source_path", "like_count.like", "like_count.counting");
        return tweet_list;
    }

    async getFollowingUserTweet(user_id) {
        const tweet_list = await knex("user_relation")
            .where("user_id", user_id)
            .join("tweet", "user_relation.following_id", "=", "tweet.user_id")
            .join("user_info", "user_info.user_id", "=", "tweet.user_id")
            .leftJoin(
                knex("tweet_like")
                .select("tweet_like.tweet_id", "tweet_like.like", knex.raw("COUNT(tweet_like.like) as counting "))
                .groupBy("tweet_like.tweet_id")
                .groupByRaw("tweet_like.like")
                .as("like_count"),
                "like_count.tweet_id",
                "tweet.id"
            )
            .orderBy("tweet.created_at", "desc")
            .select("tweet.*", "user_info.name", "user_info.avatar_source_path", "tweet_like.like", "tweet_like.counting");
        return tweet_list;
    }

    async getTweetWithId(tweet_id, user_id) {
        const query = (Array.isArray(tweet_id)) ? (
            knex("tweet")
                .whereIn('id', tweet_id)
        ) : (
            knex("tweet")
                .where('id', tweet_id)
        )
        const tweet = await query
            .join("user_info", "user_info.user_id", "=", "tweet.user_id")
            .leftJoin(
                knex("tweet_like")
                    .where("user_id", user_id)
                    .select("*"),
                "tweet_like.tweet_id",
                "tweet.tweet_id"
            )
            .select("tweet.*", "user_info.name", "user_info.avatar_source_path")
        return tweet;
    }

    async comment(user_id, tweet_id, tweet_comment) {
        const new_comment = await knex("tweet_comment")
            .insert({
                "user_id": user_id,
                "tweet_id": tweet_id,
                "tweet_comment": tweet_comment
            })
            .returning("*");
        return new_comment;
    }

    async like(user_id, tweet_id, like) {
        const new_like = await knex("tweet_like")
            .insert({
                "user_id": user_id,
                "tweet_id": tweet_id,
                "like": like
            });
        return new_like;
    }

    async getComment(tweet_id) {
        const comment_list = await knex("tweet_comment")
            .where("tweet_id", tweet_id)
            .select("*")
        return comment_list;
    }

    // need check, possible issue: if the tweet no comment, the return would not include the tweet
    async getCommentCount(tweet_id) {
        const query = (Array.isArray(tweet_id)) ? (
            knex("tweet")
                .whereIn('id', tweet_id)
        ) : (
            knex("tweet")
                .where('id', tweet_id)
        )
        const comment_count = await query
            .leftJoin("tweet_comment", "tweet_comment.tweet_id", "tweet.id")
            .groupBy("tweet.id")
            .select("tweet.id","COUNT(tweet_comment.user_id)")
        return comment_count;
    }

    async getLikeCount(tweet_id) {
        const query = (Array.isArray(tweet_id)) ? (
            knex("tweet")
                .whereIn('id', tweet_id)
        ) : (
            knex("tweet")
                .where('id', tweet_id)
        )
        const like_count = await query
            .leftJoin("tweet_like", "tweet_like.tweet_id", "tweet.id")
            .groupBy("tweet.id")
            .groupBy("tweet_like.like")
            .select("tweet.id","tweet_like.like","COUNT(tweet_like.user_id)")
        return like_count;
    }

}

module.exports = new TweetDAO();