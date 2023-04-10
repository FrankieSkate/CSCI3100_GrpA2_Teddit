/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("tweet_comment").del()
    .then(() => knex("tweet_like").del())
    .then(() => knex("user_relation").del())
    .then(() => knex("tweet").del())
    .then(() => knex("user_info").del())
    .then(() => knex("user_account").del())
    .then(function () {
      // Inserts seed entries for user_account table
      return knex("user_account").insert([
        { account: "john_doe", password: "password123", mail_address: "john_doe@example.com", admin: 0 },
        { account: "jane_doe", password: "password123", mail_address: "jane_doe@example.com", admin: 1 },
        { account: "bob_smith", password: "password123", mail_address: "bob_smith@example.com", admin: 0 },
        { account: "mary_smith", password: "password123", mail_address: "mary_smith@example.com", admin: 0 },
        { account: "jim_brown", password: "password123", mail_address: "jim_brown@example.com", admin: 0 },
        { account: "lisa_johnson", password: "password123", mail_address: "lisa_johnson@example.com", admin: 0 },
        { account: "kevin_lee", password: "password123", mail_address: "kevin_lee@example.com", admin: 0 },
        { account: "sara_kim", password: "password123", mail_address: "sara_kim@example.com", admin: 0 },
        { account: "adam_chen", password: "password123", mail_address: "adam_chen@example.com", admin: 0 },
        { account: "emily_lee", password: "password123", mail_address: "emily_lee@example.com", admin: 0 },
      ]);
    })
    .then(function () {
      // Inserts seed entries for user_info table
      return knex("user_info").insert([
        { user_id: 1, name: "John Doe", bio: "I like to code.", avatar_source_path: "/path/to/avatar.jpg", cover_source_path: "/path/to/cover.jpg" },
        { user_id: 2, name: "Jane Doe", bio: "I like to read.", avatar_source_path: "/path/to/avatar.jpg", cover_source_path: "/path/to/cover.jpg" },
        { user_id: 3, name: "Bob Smith", bio: "I like to play guitar.", avatar_source_path: "/path/to/avatar.jpg", cover_source_path: "/path/to/cover.jpg" },
        { user_id: 4, name: "Mary Smith", bio: "I like to paint.", avatar_source_path: "/path/to/avatar.jpg", cover_source_path: "/path/to/cover.jpg" },
        { user_id: 5, name: "Jim Brown", bio: "I like to play basketball.", avatar_source_path: "/path/to/avatar.jpg", cover_source_path: "/path/to/cover.jpg" },
        { user_id: 6, name: "Lisa Johnson", bio: "I like to hike.", avatar_source_path: "/path/to/avatar.jpg", cover_source_path: "/path/to/cover.jpg" },
        { user_id: 7, name: "Kevin Lee", bio: "I like to cook.", avatar_source_path: "/path/to/avatar.jpg", cover_source_path: "/path/to/cover.jpg" },
        { user_id: 8, name: "Sara Kim", bio: "I like to watch movies.", avatar_source_path: "/path/to/avatar.jpg", cover_source_path: "/path/to/cover.jpg" },
        { user_id: 9, name: "Adam Chen", bio: "I like to travel.", avatar_source_path: "/path/to/avatar.jpg", cover_source_path: "/path/to/cover.jpg" },
        { user_id: 10, name: "Emily Lee", bio: "I like to read.", avatar_source_path: "/path/to/avatar.jpg", cover_source_path: "/path/to/cover.jpg" },
      ]);
    })
    .then(function () {
      // Inserts seed entries for tweet table
      return knex("tweet").insert([
        { user_id: 1, context: "Hello, world!", picture_path: "/path/to/picture.jpg" },
        { user_id: 2, context: "Check out this article I just read.", picture_path: null },
        { user_id: 3, context: "Just finished playing a gig. It was awesome!", picture_path: "/path/to/picture.jpg" },
        { user_id: 3, context: "Getting ready for another gig tonight!", picture_path: "/path/to/picture.jpg" },
        { user_id: 4, context: "Finished this painting today. What do you think?", picture_path: "/path/to/picture.jpg" },
        { user_id: 5, context: "Just played a great game of basketball with my friends!", picture_path: null },
        { user_id: 6, context: "Beautiful day for a hike!", picture_path: "/path/to/picture.jpg" },
        { user_id: 7, context: "Just made some delicious pasta for dinner.", picture_path: "/path/to/picture.jpg" },
        { user_id: 8, context: "Watching a great movie tonight. Anyone have any recommendations?", picture_path: null },
        { user_id: 9, context: "Exploring a new city today!", picture_path: "/path/to/picture.jpg" },
        { user_id: 10, context: "Finally finished this book after weeks of reading. Highly recommend!", picture_path: null },
      ]);
    })
    .then(function () {
      // Inserts seed entries for user_relation table
      return knex("user_relation").insert([
        { follower_id: 1, following_id: 2 },
        { follower_id: 1, following_id: 3 },
        { follower_id: 2, following_id: 1 },
        { follower_id: 3, following_id: 1 },
        { follower_id: 3, following_id: 5 },
        { follower_id: 4, following_id: 5 },
        { follower_id: 5, following_id: 6 },
        { follower_id: 6, following_id: 4 },
        { follower_id: 7, following_id: 8 },
        { follower_id: 8, following_id: 9 },
        { follower_id: 9, following_id: 10 },
        { follower_id: 10, following_id: 7 },
      ]);
    })
    .then(function () {
      // Inserts seed entries for tweet_like table
      return knex("tweet_like").insert([
        { user_id: 2, tweet_id: 1 },
        { user_id: 3, tweet_id: 1 },
        { user_id: 4, tweet_id: 1 },
        { user_id: 5, tweet_id: 2 },
        { user_id: 6, tweet_id: 2 },
        { user_id: 7, tweet_id: 3 },
        { user_id: 8, tweet_id: 3 },
        { user_id: 9, tweet_id: 3 },
        { user_id: 10, tweet_id: 3 },
        { user_id: 1, tweet_id: 4 },
        { user_id: 2, tweet_id: 4 },
        { user_id: 3, tweet_id: 4 },
        { user_id: 4, tweet_id: 4 },
        { user_id: 5, tweet_id: 5 },
        { user_id: 6, tweet_id: 5 },
        { user_id: 7, tweet_id: 5 },
        { user_id: 8, tweet_id: 6 },
        { user_id: 9, tweet_id: 6 },
        { user_id: 10, tweet_id: 7 },
      ]);
    })
    .then(function () {
      // Inserts seed entries for tweet_comment table
      return knex("tweet_comment").insert([
        { user_id: 2, tweet_id: 1, context: "Nice tweet!" },
        { user_id: 3, tweet_id: 1, context: "Agreed!" },
        { user_id: 4, tweet_id: 1, context: "Me too!" },
        { user_id: 5, tweet_id: 2, context: "Interesting article." },
        { user_id: 6, tweet_id: 2, context: "Thanks for sharing!" },
        { user_id: 7, tweet_id: 3, context: "Wish I could have been there!" },
        { user_id: 8, tweet_id: 3, context: "Looks like it was a great show!" },
        { user_id: 9, tweet_id: 3, context: "Awesome!" },
        { user_id: 10, tweet_id: 3, context: "Wish I could have seen it!" },
        { user_id: 1, tweet_id: 4, context: "Thanks for the support!" },
        { user_id: 2, tweet_id: 4, context: "Keep up the great work!" },
        { user_id: 3, tweet_id: 4, context: "Can't wait to see what you create next!" },
        { user_id: 4, tweet_id: 4, context: "Amazing talent!" },
        { user_id: 5, tweet_id: 5, context: "Looks like fun!" },
        { user_id: 6, tweet_id: 5, context: "Great picture!" },
        { user_id: 7, tweet_id: 5, context: "Wish I was there!" },
        { user_id: 8, tweet_id: 6, context: "One of my favorites!" },
        { user_id: 9, tweet_id: 6, context: "Great movie!" },
        { user_id: 10, tweet_id: 7, context: "Thanks for the recommendation!" },
      ]);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("tweet_comment")
    .dropTableIfExists("tweet_like")
    .dropTableIfExists("user_relation")
    .dropTableIfExists("tweet")
    .dropTableIfExists("user");
};
