var bookshelf = require('../config/bookshelf');

var Customer = bookshelf.Model.extend({
  tableName: 'customers'
})

module.exports = Customer;
