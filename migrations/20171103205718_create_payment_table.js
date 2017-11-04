
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('payments', function(table) {
      table.increments()
      table.integer('order_id').unsigned().index().references('id').inTable('orders')
      table.integer('customer_id').unsigned().index().references('id').inTable('customers')
      table.string('token')
      table.timestamp('payment_date').defaultTo(knex.fn.now())
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('payments')
  ])
};
