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
};
