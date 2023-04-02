/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  // await knex('table_name').del()
  await knex('user_account').insert([
    {id: 1, account: "abc", password: "123", mail_address: "abc@gmail.com"},
    {id: 2, account: "bcd", password: "345", mail_address: "bcd@outlook.com"},
    {id: 3, account: "efg", password: "567", mail_address: "efg@yahoo.com"}
  ]);
  await knex('user_info').insert([
    {user_id: 1, name: 'apple'},
    {user_id: 2, name: 'banana'},
    {user_id: 3, name: 'cat'}
  ]);
  await knex('user_relation').insert([
    {user_id: 1, following_id: 3},
    {user_id: 3, following_id: 1},
    {user_id: 1, following_id: 2}
  ]);
  await knex('tweet').insert([
    {user_id: 1, context: "the first first first tweet"},
    {user_id: 1, context: "2nd"},
    {user_id: 3, context: "where is my group mate...\nI need help..."}
  ]);
};
