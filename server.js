var express = require('express');
var path = require('path');
var logger = require('morgan');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var dotenv = require('dotenv');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var bookshelf = require('./config/bookshelf');


// Load environment variables from .env file
dotenv.load();

// Models & Collections
var User = require('./models/User');
var Product = require('./models/Product');
var Category = require('./models/Category');

// Controllers
var userController = require('./controllers/user');
var transactionController = require('./controllers/transaction')
var productController = require('./controllers/product')
var mapsController = require('./controllers/maps')
var adminController = require('./controllers/admin')

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// API
var kalamata = require('kalamata');
var api = kalamata(app, {apiRoot:'/api/v1'});
api.expose(Product)
api.expose(Category)

app.use(function(req, res, next) {
  req.isAuthenticated = function() {
    var token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token;
    try {
      return jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (err) {
      return false;
    }
  };

  if (req.isAuthenticated()) {
    var payload = req.isAuthenticated();
    new User({ id: payload.sub })
      .fetch()
      .then(function(user) {
        req.user = user;
        next();
      });
  } else {
    next();
  }
});

app.put('/account', userController.ensureAuthenticated, userController.accountPut);
app.delete('/account', userController.ensureAuthenticated, userController.accountDelete);
app.post('/signup', userController.signupPost);
app.post('/login', userController.loginPost);
app.post('/forgot', userController.forgotPost);
app.post('/reset/:token', userController.resetPost);
app.get('/unlink/:provider', userController.ensureAuthenticated, userController.unlink);
app.post('/purchase',userController.ensureAuthenticated,transactionController.ensureOrderExists, transactionController.purchasePost)
app.post('/checkout', userController.ensureAuthenticated, transactionController.checkoutPost)
app.get('/current-order/:id', userController.ensureAuthenticated, transactionController.currentOrderGet)
app.get('/find-order/:id', userController.ensureAuthenticated, transactionController.idOrderGet)
app.get('/order/:id',userController.ensureAuthenticated, transactionController.orderGet)
app.put('/order', userController.ensureAuthenticated, transactionController.orderPut)
app.post('/order', userController.ensureAuthenticated, transactionController.orderPost)
app.post('/order/:id', userController.ensureAuthenticated, transactionController.orderDelete)
app.get('/address', mapsController.getAutoComplete)
app.get('/address/:id', userController.ensureAuthenticated, mapsController.getAddress)
app.post('/address', userController.ensureAuthenticated, mapsController.addressPost)
app.delete('/address/:id', userController.ensureAuthenticated, mapsController.addressDelete)
app.get('/search/', productController.productGet)
app.get('/admin/products', adminController.productGet)
app.get('/admin/accounts', adminController.accountGet)
app.get('/admin/addresses', adminController.addressGet)
app.put('/admin/products', adminController.productPut)
app.put('/admin/users', adminController.userPut)
app.get('/category/:id', productController.productCategoryGet)

app.get('*', function(req, res) {
  res.redirect('/#' + req.originalUrl);
});

// Production error handler
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
