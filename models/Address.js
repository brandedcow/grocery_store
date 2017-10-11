var bookshelf = require('../config/bookshelf');

var Address = bookshelf.Model.extend({
  tableName: 'addresses'
})

module.exports = Address;
