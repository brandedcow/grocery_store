var bookshelf = require('../config/bookshelf');

var Category = bookshelf.Model.extend({
  tableName: 'categories',
})

module.exports = Category;
