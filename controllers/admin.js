var Product = require('../models/Product')
var Customer = require('../models/User')
var Address = require('../models/Address')

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
