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

}
