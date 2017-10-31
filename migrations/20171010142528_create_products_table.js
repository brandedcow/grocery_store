
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('products', function(table) {
      table.increments();
      table.string('name');
      table.float('price');
      table.string('description');
      table.float('weight');
      table.integer('quantity');
      table.integer('category_id').unsigned().index().references('id').inTable('categories')

    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('products')
  ])
};
