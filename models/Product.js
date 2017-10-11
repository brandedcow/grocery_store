var bookshelf = require('../config/bookshelf');

var Product = bookshelf.Model.extend({
  tableName: 'products'
})

module.exports = Product;
