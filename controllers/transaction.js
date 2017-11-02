var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var qs = require('querystring');
var _ = require('underscore');

var Order = require('../models/Order')
var Product = require('../models/Product')
var Purchase = require('../models/Purchase').model
var Purchases = require('../models/Purchase').collection


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
    req.assert('customer_id', 'Customer cannot be blank').notEmpty()
    req.assert('product_id', 'Product cannot be blank').notEmpty();
    req.assert('quantity', 'Quantity cannot be blank').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
      return res.status(400).send(errors);
    }

    // find current pending order & add purchase
    new Order({
      customer_id: req.body.customer_id,
      order_status: 1
    })
    .fetch()
    .then(function(order) {
      if (order === null) {
        return res.status(400).send({ msg:'no order found'})
      } else {
        // find add same products same order
        new Purchase({
          order_id: order.get('id'),
          product_id: req.body.product_id,
        }).fetch()
          .then(function(purchase) {
            // did not find
            if (purchase === null) {
              new Purchase({
                order_id: order.get('id'),
                product_id: req.body.product_id,
                quantity: req.body.quantity
              }).save()
                .then(function() {
                  return res.status(200).send({ msg: 'insert success'})
                })
            // update found
            } else {
              new Purchase({id: purchase.get('id')})
                .save({quantity: req.body.quantity + purchase.get('quantity')}, {patch: true})
                .then(function() {
                  return res.status(200).send({ msg: 'update success'})
                })

            }
          })
      }
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


/**
 * GET /order/:id
 * get order info based on customer_id
 */
exports.orderGet = function(req, res, next) {

  new Order({
    customer_id: req.params.id,
    order_status: 1
  }).fetch()
    .then(function(order) {
      // not found
      if (order ===null){
        return res.status(400).send({ msg:'no pending order'})
      } else {
        new Purchase({ id: order.get('id') })
          .fetchAll()
          .then(function(resData) {
            if (resData === null) {
              return res.status(400).send({ msg:'no items in order'})
            } else {
              var info = {
                itemCount: 0,
                items: [],
                totalWeight: 0,
                total: 0
              }
              resData.forEach(function(model) {
                info.itemCount += model.get('quantity')
                info.items.push({
                  id: model.get('product_id'),
                  quantity: model.get('quantity')
                })
              })
              res.status(200).send(info)
            }
          })
      }
    })
};

/**
 * DELETE /account
 */
exports.accountDelete = function(req, res, next) {
  new User({ id: req.user.id }).destroy().then(function(user) {
    res.send({ msg: 'Your account has been permanently deleted.' });
  });
};

/**
 * GET /unlink/:provider
 */
exports.unlink = function(req, res, next) {
  new User({ id: req.user.id })
    .fetch()
    .then(function(user) {
      switch (req.params.provider) {
        case 'facebook':
          user.set('facebook', null);
          break;
        case 'google':
          user.set('google', null);
          break;
        case 'twitter':
          user.set('twitter', null);
          break;
        case 'vk':
          user.set('vk', null);
          break;
        default:
        return res.status(400).send({ msg: 'Invalid OAuth Provider' });
      }
      user.save(user.changed, { patch: true }).then(function() {
      res.send({ msg: 'Your account has been unlinked.' });
      });
    });
};

/**
 * POST /forgot
 */
exports.forgotPost = function(req, res, next) {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('email', 'Email cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  async.waterfall([
    function(done) {
      crypto.randomBytes(16, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      new User({ email: req.body.email })
        .fetch()
        .then(function(user) {
          if (!user) {
        return res.status(400).send({ msg: 'The email address ' + req.body.email + ' is not associated with any account.' });
          }
          user.set('passwordResetToken', token);
          user.set('passwordResetExpires', new Date(Date.now() + 3600000)); // expire in 1 hour
          user.save(user.changed, { patch: true }).then(function() {
            done(null, token, user.toJSON());
          });
        });
    },
    function(token, user, done) {
      var transporter = nodemailer.createTransport({
        service: 'Mailgun',
        auth: {
          user: process.env.MAILGUN_USERNAME,
          pass: process.env.MAILGUN_PASSWORD
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'support@yourdomain.com',
        subject: '✔ Reset your password on Mega Boilerplate',
        text: 'You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'http://' + req.headers.host + '/reset/' + token + '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      transporter.sendMail(mailOptions, function(err) {
        res.send({ msg: 'An email has been sent to ' + user.email + ' with further instructions.' });
        done(err);
      });
    }
  ]);
};

/**
 * POST /reset
 */
exports.resetPost = function(req, res, next) {
  req.assert('password', 'Password must be at least 4 characters long').len(4);
  req.assert('confirm', 'Passwords must match').equals(req.body.password);

  var errors = req.validationErrors();

  if (errors) {
      return res.status(400).send(errors);
  }

  async.waterfall([
    function(done) {
      new User({ passwordResetToken: req.params.token })
        .where('passwordResetExpires', '>', new Date())
        .fetch()
        .then(function(user) {
          if (!user) {
          return res.status(400).send({ msg: 'Password reset token is invalid or has expired.' });
          }
          user.set('password', req.body.password);
          user.set('passwordResetToken', null);
          user.set('passwordResetExpires', null);
          user.save(user.changed, { patch: true }).then(function() {
          done(err, user.toJSON());
          });
        });
    },
    function(user, done) {
      var transporter = nodemailer.createTransport({
        service: 'Mailgun',
        auth: {
          user: process.env.MAILGUN_USERNAME,
          pass: process.env.MAILGUN_PASSWORD
        }
      });
      var mailOptions = {
        from: 'support@yourdomain.com',
        to: user.email,
        subject: 'Your Mega Boilerplate password has been changed',
        text: 'Hello,\n\n' +
        'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      transporter.sendMail(mailOptions, function(err) {
        res.send({ msg: 'Your password has been changed successfully.' });
      });
    }
  ]);
};
