angular.module('MyApp', ['ngRoute', 'satellizer'])
  .config(function($routeProvider, $locationProvider, $authProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      })
      .when('/products', {
        templateUrl: 'partials/products.html',
        controller: 'ProductsCtrl'
      })
      .when('/product-detail', {
        templateUrl: 'partials/product-detail.html',
        controller: 'DetailCtrl'
      })
      .when('/cart', {
        templateUrl: 'partials/cart.html',
        controller: 'CartCtrl'
      })
      .when('/checkout-address', {
        templateUrl: 'partials/checkout-1.html',
        controller: 'CheckoutCtrl'
      })
      .when('/checkout-delivery', {
        templateUrl: 'partials/checkout-2.html',
        controller: 'CheckoutCtrl'
      })
      .when('/checkout-payment', {
        templateUrl: 'partials/checkout-3.html',
        controller: 'CheckoutCtrl'
      })
      .when('/checkout-review', {
        templateUrl: 'partials/checkout-4.html',
        controller: 'CheckoutCtrl'
      })
      .when('/contact', {
        templateUrl: 'partials/contact.html',
        controller: 'ContactCtrl'
      })
      .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/signup', {
        templateUrl: 'partials/signup.html',
        controller: 'SignupCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/account', {
        templateUrl: 'partials/profile.html',
        controller: 'ProfileCtrl',
        resolve: { loginRequired: loginRequired }
      })
      .when('/forgot', {
        templateUrl: 'partials/forgot.html',
        controller: 'ForgotCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/reset/:token', {
        templateUrl: 'partials/reset.html',
        controller: 'ResetCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/track-order', {
        templateUrl: 'partials/track-order.html',
        controller: 'TrackOrderCtrl'
      })
      .otherwise({
        templateUrl: 'partials/404.html'
      });

    $authProvider.loginUrl = '/login';
    $authProvider.signupUrl = '/signup';

    function skipIfAuthenticated($location, $auth) {
      if ($auth.isAuthenticated()) {
        $location.path('/');
      }
    }

    function loginRequired($location, $auth) {
      if (!$auth.isAuthenticated()) {
        $location.path('/login');
      }
    }
  })
  .run(function($rootScope, $window) {
    if ($window.localStorage.user) {
      $rootScope.currentUser = JSON.parse($window.localStorage.user);
    }
  })
