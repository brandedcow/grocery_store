var Product = require('../models/Product')

exports.productGet = function(req,res) {
  new Product ()
    .where('name', 'like', '%'+req.query.name+'%')
    .fetchAll()
    .then(function(resData) {
      if (resData === null) {
        res.status(200).send({ msg: 'product not found' })
      } else {
        res.status(200).send(resData)
      }
    })
    .catch(function(response) {
      res.status(400).send(response)
    })

}

exports.productCategoryGet = function(req, res) {
  new Product()
    .where({ category_id: req.params.id})
    .fetchAll()
    .then(function(resData) {
      if (resData === null) {
        res.status(200).send({ msg: 'product not found' })
      } else {
        res.status(200).send(resData)
      }
    })
    .catch(function(response) {
      res.status(400).send(response)
    })
}
