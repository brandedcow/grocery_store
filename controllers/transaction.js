var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var qs = require('querystring');
var _ = require('underscore');
var bookshelf = require('../config/bookshelf');
var stripe = require('stripe')('sk_test_49DtJCDbhT2UCfKfZumex3v8')


var Order = require('../models/Order')
var Product = require('../models/Product')
var Purchase = require('../models/Purchase').model
var Purchases = require('../models/Purchase').collection
var Delivery = require('../models/Delivery')

exports.ensureOrderExists = function(req, res, next) {
  new Order({ customer_id: req.body.customer_id })
    .fetch()
    .then(function(order) {
      if (order === null) {
        new Order({customer_id:req.body.customer_id}).save()
        next()
      } else {
        next()
      }
    })
    .catch(function(err) {
      res.status(400).send()
    })
}
  /**
   * POST /purchase
   * Add to purchases table
   * body: { customer_id, product_id, quantity }
   */
exports.purchasePost = function(req, res, next) {
    var orderID;

    var newOrder = new Order({
      customer_id: req.body.customer_id,
      order_status: 1
    }).fetch()
      .then(function(order) {
        if (order === null) {
          return new Order({
            customer_id: req.body.customer_id,
            order_status: 1
          }).save()
        } else {
          return order
        }
      })
      .catch(function(err) {
        res.status(400).send()
      })

    var newPurchase = newOrder.then(function(order) {
      orderID = order.get('id')
      return new Purchase({
        order_id: orderID,
        product_id: req.body.product_id,
      }).fetch()
    })
    .catch(function(err) {
      res.status(400).send()
    })

    newPurchase.then(function(purchase) {
      if (purchase === null) {
        new Purchase({
          order_id: orderID,
          product_id: req.body.product_id,
          quantity: req.body.quantity
        }).save()
        res.status(200).send({ message: 'insert success'})
      } else {
        new Purchase({id: purchase.get('id')})
          .save({quantity: req.body.quantity + purchase.get('quantity')}, {patch: true})
          .then(function() {
            return res.status(200).send({ msg: 'update success'})
          })
          .catch(function(err) {
            res.status(400).send()
          })
      }
    })
    .catch(function(err) {
      res.status(400).send()
    })
  };

/**
 * POST /checkout
 */
exports.checkoutPost = function(req, res, next) {
  req.assert('name', 'Name cannot be blank').notEmpty();
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('email', 'Email cannot be blank').notEmpty();
  req.assert('password', 'Password must be at least 4 characters long').len(4);

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }).save()
    .then(function(user) {
        res.send({ token: generateToken(user), user: user });
    })
    .catch(function(err) {
      if (err.code === 'ER_DUP_ENTRY' || err.code === '23505') {
        return res.status(400).send({ msg: 'The email address you have entered is already associated with another account.' });
      }
    });


};

exports.orderDelete = function (req, res, next) {
  var subquery = bookshelf.knex
    .select('id')
    .from('orders')
    .where({
      customer_id:req.body.cust,
      order_status: 1
    })
    .then(function(rows){
      return new bookshelf.knex('purchases')
        .del()
        .where({
          order_id: rows[0].id,
          product_id: req.params.id
        })
    })
    .catch(function(response){
      return res.status(400).send(response)
    })

  subquery.then(function(response) {
    return res.send('deleted')
  })
  .catch(function(response){
    return res.status(400).send('failed')
  })
}

/**
 * GET /find-order/:id
 * get order info based on order_id
 */
exports.idOrderGet = function(req, res, next) {

  bookshelf.knex
    .select('products.id', 'products.name', 'purchases.quantity', 'products.price', 'products.weight', 'purchases.order_id', 'products.image')
    .from('products')
    .innerJoin('purchases', 'products.id', 'purchases.product_id')
    .where('purchases.order_id', req.params.id)
    .then(function(response) {
      var info = {
        orderNum: null,
        itemCount: 0,
        items: response,
        totalWeight: 0,
        total: 0
      }
      info.items.forEach(function(item) {
        info.orderNum = item.order_id
        info.itemCount += item.quantity
        info.totalWeight += (item.weight * item.quantity)
        info.total += (item.price * item.quantity)
      })
      res.status(200).send(info)
    })
}
/**
 * GET /current-order/:id
 * get order info based on customer_id
 */
exports.currentOrderGet = function(req, res, next) {
  var subquery =
  bookshelf.knex
    .select('id')
    .from('orders')
    .where({
      customer_id:req.params.id,
      order_status: 1
    })

  bookshelf.knex
    .select('products.id', 'products.name', 'purchases.quantity', 'products.price', 'products.weight', 'purchases.order_id', 'products.image')
    .from('products')
    .innerJoin('purchases', 'products.id', 'purchases.product_id')
    .where('purchases.order_id', subquery)
    .then(function(response) {
      var info = {
        orderNum: null,
        itemCount: 0,
        items: response,
        totalWeight: 0,
        total: 0
      }
      info.items.forEach(function(item) {
        info.orderNum = item.order_id
        info.itemCount += item.quantity
        info.totalWeight += (item.weight * item.quantity)
        info.total += (item.price * item.quantity)
      })
      res.status(200).send(info)
    })
}
/**
 * GET /order/:id
 */
 exports.orderGet = function(req, res, next) {
      bookshelf.knex.raw(
        `select orders.id, orders.order_date, orders.order_status,
        (select sum(purchases.quantity * products.price) as total from products inner join purchases on products.id = purchases.product_id where purchases.order_id = orders.id) as total,
        (select (select concat(street_line, ', ', city, ', ' , state , ', ' , zip , ', ' , country) as address from addresses where id=address_id) from deliveries where order_id =orders.id) as address
        from orders where customer_id = ${req.params.id};`
      ).then(function(response) {
        if (!response) {
          res.status(400).send({error: 'no orders found'})
        } else {
          res.status(200).send(response[0])
        }
      })
 }

/**
 * PUT /order
 */
exports.orderPut = function(req, res, next) {
  req.body.items.forEach(function(item){

    new Purchase({
      order_id: req.body.orderNum,
      product_id: item.id
    }).fetch()
      .then(function(purchase) {
        purchase.save({
            quantity: item.quantity
          },{patch:true})
      })
      .catch(function(response){
        return res.status(400).send()
      })
  })
  return res.status(200).send({ msg: 'success' })
};

/**
 * POST /order/
 * stripe charge
 * order status change
 * inventory change
 * create delivery
 */
exports.orderPost = function(req, res, next) {
  var orderNum
  var amount = req.body.amount * 100
  stripe.charges.create({
    amount: amount,
    currency: 'usd',
    description: 'OFS charge',
    source: req.body.token,
  }, function(err, charge) {
    if (err) {
      return res.status(400).send(err)
    } else {
      // charge successfully made
    }
  })
// find order
  var subquery = bookshelf.knex
    .select('id')
    .from('orders')
    .where({
      customer_id:req.body.customer_id,
      order_status: 1
    })
    .then(function(rows){
      orderNum =rows[0].id
      return new Order({
        id: rows[0].id,
        customer_id:req.body.customer_id
      }).fetch()
    })
    .catch(function(response){
      return res.status(400).send(response)
    })
  // change order status
  var inventoryUpdate = subquery.then(function(response) {
      orderNum = response.get('id')
      response.save({
        order_status: 2
      },{patch:true})

      return bookshelf.knex.raw(
        'update products join purchases on products.id = purchases.product_id set products.quantity = products.quantity - purchases.quantity'
      )
    })
    .catch(function(reponse) {
      return res.status(400).send('order status change failed')
    })

  var findAddress = inventoryUpdate.then(function(response) {
      return new Delivery({
        order_id:orderNum,
        address_id:req.body.address,
        delivery_status: 'In Transit'
      }).save()
    })
    .catch(function(reponse) {
      return res.status(400).send('inventory update failed')
    })
  var createDelivery = findAddress.then(function(response) {
    res.status(200).send('done')
  })
  .catch(function(response) {
    res.status(400).send(response)
  })
  //
  // createDelivery
  //   .then(function(reponse) {
  //     return res.status(200).send('done')
  //   })
  //   .catch(function(reponse) {
  //     return res.status(400).send('inventory update failed')
  //   })

}
