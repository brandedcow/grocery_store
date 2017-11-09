
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('customers',function(table) {
      table.increments()
      table.string('name')
      table.string('email').unique()
      table.string('password')
      table.timestamps()
      table.boolean('admin').defaultTo(false)
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('customers')
  ])
};
