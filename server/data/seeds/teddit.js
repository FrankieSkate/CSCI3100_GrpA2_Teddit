/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  // await knex('table_name').del()
  await knex('users').insert([
    {id: 1, name: 'apple'},
    {id: 2, name: 'banana'},
    {id: 3, name: 'cat'}
  ]);
  await knex('user_account').insert([
    {user_id: 1, account: "abc", password: "abc", mail_address: "abc"},
    {user_id: 2, account: "bcd", password: "bcd", mail_address: "bcd"},
    {user_id: 3, account: "efg", password: "efg", mail_address: "efg"}
  ])
};
