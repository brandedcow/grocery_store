
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('deliveries', function(table) {
      table.increments()
      table.integer('order_id').unsigned().index().references('id').inTable('orders')
      table.integer('address_id').unsigned().index().references('id').inTable('addresses')
      table.string('delivery_status')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('deliveries')
  ])
};
