var Product = require('../models/Product')
var Customer = require('../models/User')
var Address = require('../models/Address')
var bookshelf = require('../config/bookshelf');


exports.productGet = function(req,res) {
  new Product ()
    .fetchAll()
    .then(function(resData) {
        if (resData === null) {
          res.status(200).send({ message: 'no product found' })
        } else {
          res.status(200).send(resData)
        }
      })
}
exports.accountGet = function(req,res) {
  new Customer ()
    .fetchAll()
    .then(function(resData) {
        if (resData === null) {
          res.status(200).send({ msg: 'no account found' })
        } else {
          res.status(200).send(resData)
        }
      })
}

exports.addressGet = function(req,res) {
  new Address ()
    .fetchAll()
    .then(function(resData) {
        if (resData === null) {
          res.status(200).send({ msg: 'no address found' })
        } else {
          res.status(200).send(resData)
        }
      })
}

exports.productPut = function(req,res) {
  var products = req.body.products
  products.forEach(function(product) {
    bookshelf.knex.raw(
      `update products set name="${product.name}", price=${product.price}, description="${product.description}", weight=${product.weight}, quantity=${product.quantity}, category_id=${product.category_id} where id=${product.id}`
    ).then(function(response) {
      if (!response) {
        res.status(400).send({error: "not updated"})
      } else {
        res.status(200).send(response)
      }
    })

  })
}
