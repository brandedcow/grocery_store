
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('orders', function(table) {
      table.increments()
      table.integer('customer_id').unsigned().index().references('id').inTable('customers')
      table.timestamp('order_date').defaultTo(knex.fn.now())
      table.timestamp('delivery_date').defaultTo(knex.fn.now())
      table.integer('order_status').defaultTo(1).unsigned().index().references('id').inTable('order_status_types')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('orders')
  ])
};
