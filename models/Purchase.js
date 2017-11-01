var bookshelf = require('../config/bookshelf');

var Purchase = bookshelf.Model.extend({
  tableName: 'purchases',
})

module.exports = Purchase;
