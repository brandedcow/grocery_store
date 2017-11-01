
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('order_status_types', function(table) {
      table.increments()
      table.string('name');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('order_status_types')
  ])
};
