var bookshelf = require('../config/bookshelf');

var Purchase = bookshelf.Model.extend({
  tableName: 'purchases',
})

var Purchases = bookshelf.Collection.extend({
  model: Purchase
})

module.exports = {
  model: Purchase,
  collection: Purchases
};
