
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('addresses', function(table) {
      table.increments()
      table.string('street_line')
      table.string('city')
      table.string('state')
      table.string('zip')
      table.string('country')
      table.unique(['street_line','zip'])
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('addresses')
  ])
};
