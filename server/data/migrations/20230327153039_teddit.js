/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('users', function(table){
      table.increments('id');
      table.string('name').notNullable();
    })
    .createTable('tweets', function(table){
      table.increments('id');
      table.integer('user_id').unsigned().index().references('id').inTable('users');
      table.string('tweet_text').notNullable();
      table.timestamp('create_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTable('user_relation', function(table){
      table.increments();
      table.integer('user_id').unsigned().index().references('id').inTable('users');
      table.integer('following').unsigned().index().references('id').inTable('users');
      table.timestamp('create_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTable('user_account', function(table){
      table.increments();
      table.integer('user_id').unsigned().index().references('id').inTable('users');
      table.string('account').notNullable();
      table.string('password').notNullable();
      table.string('mail_address').notNullable();
      table.timestamp('create_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTable('tweet_comment', function(table){
      table.increments();
      table.integer('user_id').unsigned().index().references('id').inTable('users');
      table.integer('tweet_id').unsigned().index().references('id').inTable('tweets');
      table.string('tweet_comment').notNullable();
    })
    .createTable('tweet_like', function(table){
      table.increments();
      table.integer('like_user_id').unsigned().index().references('id').inTable('users');
      table.integer('tweet_id').unsigned().index().references('id').inTable('tweets');
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema
    .dropTable('users')
    .dropTable('tweets')
    .dropTable('user_relation')
    .dropTable('user_account')
    .dropTable('tweet_comment')
    .dropTable('tweet_like');
  };
  