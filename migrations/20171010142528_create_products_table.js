
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('products', function(table) {
      table.increments();
      table.string('product_name');
      table.float('product_price');
      table.string('product_description');
      table.float('product_weight');
      table.integer('product_quantity');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('products')
  ])
};
