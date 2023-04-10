/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("user_account", function (table) {
      table.increments("id").primary();
      table.string("account").notNullable().unique();
      table.string("password").notNullable();
      table.string("mail_address").notNullable().unique();
      table.timestamp("create_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("user_info", function (table) {
      table
        .integer("user_id")
        .unsigned()
        .primary()
        .references("id")
        .inTable("user_account")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("name").notNullable();
    })
    .createTable("tweet", function (table) {
      table.increments("id").primary();
      table
        .integer("user_id")
        .unsigned()
        .index()
        .references("id")
        .inTable("user_account");
      table.string("tweet_text").notNullable();
      table.timestamp("create_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("user_relation", function (table) {
      table.increments().primary();
      table
        .integer("user_id")
        .unsigned()
        .index()
        .references("id")
        .inTable("user_account")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("following_id")
        .unsigned()
        .index()
        .references("id")
        .inTable("user_account")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamp("create_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("tweet_comment", function (table) {
      table.increments().primary();
      table
        .integer("user_id")
        .unsigned()
        .index()
        .references("id")
        .inTable("user_account")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("tweet_id")
        .unsigned()
        .index()
        .references("id")
        .inTable("tweet")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("tweet_comment").notNullable();
      table.timestamp("create_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("tweet_like", function (table) {
      table.increments().primary();
      table
        .integer("like_user_id")
        .unsigned()
        .index()
        .references("id")
        .inTable("user_account")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("tweet_id")
        .unsigned()
        .index()
        .references("id")
        .inTable("tweet")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("chatroom-conversation", function (table) {
      table.increments().primary();
      table.specificType("members", "INT []");
      table.timestamp("create_at").defaultTo(knex.fn.now());
    })
    .createTable("chatroom-message", function (table) {
      table.increments().primary();
      table.string("conversation_id");
      table.string("chatroom_text").notNullable();
      table.timestamp("create_at").defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable("tweet_comment")
    .dropTable("tweet_like")
    .dropTable("user_relation")
    .dropTable("tweet")
    .dropTable("user_info")
    .dropTable("user_account")
    .dropTable("chatroom-conversation")
    .dropTable("chatroom-message");
};
