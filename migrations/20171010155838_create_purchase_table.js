
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('purchases', function(table) {
      table.increments()
      table.integer('order_id').unsigned().index().references('id').inTable('orders')
      table.integer('product_id').unsigned().index().references('id').inTable('products')
      table.integer('quantity')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('purchases')
  ])
};
