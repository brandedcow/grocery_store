var bookshelf = require('../config/bookshelf');

var Delivery = bookshelf.Model.extend({
  tableName: 'deliveries',
})

module.exports = Delivery;
