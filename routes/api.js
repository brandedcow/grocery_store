/** API end points
Product

GET /api/v1/product - List all of the products.
GET /api/v1/product/23 - Get the product with id 23.
POST /api/v1/product - Create a new product
PUT /api/v1/product/7 - Update product with an id of 7.
DELETE /api/v1/product/83 - Delete the product with an id of 83.



*/

var express = require('express')
var router = express.Router()
var path = require('path')
var api = require('bookshelf-api')({
  path: path.join(__dirname, '../models')
})

router.use('/product', api)

module.exports = router
