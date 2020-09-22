import Knex from 'knex';

export async function up(Knex: Knex){
  return Knex.schema.createTable('points', table => {

    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('image').notNullable();
    table.string('adress').notNullable();
    table.string('adress2').notNullable();
    table.string('state').notNullable();
    table.string('city').notNullable();
    table.string('items').notNullable();

  })
}
export async function down(Knex: Knex){
  return Knex.schema.dropTable('points');
}