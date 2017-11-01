var bookshelf = require('../config/bookshelf');

var Order = bookshelf.Model.extend({
  tableName: 'orders'
})

module.exports = Order;
