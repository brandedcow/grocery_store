var bookshelf = require('../config/bookshelf');

var CustomerAddress = bookshelf.Model.extend({
  tableName: 'customer_addresses',
})

module.exports = CustomerAddress;
