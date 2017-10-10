
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('orders', function(table) {
      table.increments()
      table.integer('customer_id').unsigned().index().references('id').inTable('customers')
      table.timestamp('order_date').defaultTo(knex.fn.now())
      table.string('order_status')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('orders')
  ])
};
